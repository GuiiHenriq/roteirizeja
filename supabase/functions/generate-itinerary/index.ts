import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, departureDate, returnDate, interests, userId } = await req.json();
    console.log('Generating itinerary for:', { destination, departureDate, returnDate, interests, userId });

    // Criar cliente Supabase com a chave anônima
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const systemPrompt = `Assistente de viagens especializado em roteiros detalhados em PT-BR.
    Regras:
    - Usar português brasileiro
    - Valores em Reais (BRL)
    - Descrições concisas
    - Atividades realistas para cada horário
    - Custos realistas para a região`;

    const prompt = `Crie um roteiro para ${destination} de ${departureDate} até ${returnDate}.
    Foco: ${interests || 'turismo geral'}
    Inclua: atividades para manhã, tarde e noite
    Para cada atividade: nome, breve descrição, custo em Reais (BRL)
    Mantenha as atividades relevantes para a localização`;

    const functionSchema = {
      name: "generate_travel_itinerary",
      description: "Generate travel itinerary with daily activities",
      parameters: {
        type: "object",
        required: ["destination", "dates", "itinerary"],
        properties: {
          destination: {
            type: "string",
            description: "Trip destination"
          },
          dates: {
            type: "object",
            required: ["start", "end"],
            properties: {
              start: { type: "string", format: "date" },
              end: { type: "string", format: "date" }
            }
          },
          itinerary: {
            type: "array",
            items: {
              type: "object",
              required: ["day", "activities"],
              properties: {
                day: { type: "string", format: "date" },
                activities: {
                  type: "object",
                  required: ["morning", "afternoon", "evening"],
                  properties: {
                    morning: {
                      type: "object",
                      required: ["Name", "Description", "Cost"],
                      properties: {
                        Name: { type: "string" },
                        Description: { type: "string" },
                        Cost: { type: "number" }
                      }
                    },
                    afternoon: {
                      type: "object",
                      required: ["Name", "Description", "Cost"],
                      properties: {
                        Name: { type: "string" },
                        Description: { type: "string" },
                        Cost: { type: "number" }
                      }
                    },
                    evening: {
                      type: "object",
                      required: ["Name", "Description", "Cost"],
                      properties: {
                        Name: { type: "string" },
                        Description: { type: "string" },
                        Cost: { type: "number" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        functions: [functionSchema],
        function_call: { name: "generate_travel_itinerary" },
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices?.[0]?.message?.function_call?.arguments) {
      throw new Error('Invalid response format from OpenAI');
    }

    const itineraryData = JSON.parse(data.choices[0].message.function_call.arguments);
    console.log('Parsed itinerary data:', itineraryData);

    // Se temos um userId, atualizar o contador de roteiros
    if (userId) {
      try {
        // Primeiro, obter o contador atual
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('count_itineraries')
          .eq('id', userId)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          const currentCount = profileData?.count_itineraries || 0;
          
          // Atualizar o contador
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ count_itineraries: currentCount + 1 })
            .eq('id', userId);

          if (updateError) {
            console.error('Error updating profile count:', updateError);
          } else {
            console.log('Successfully updated itinerary count for user:', userId);
          }
        }
      } catch (countError) {
        console.error('Error in count update process:', countError);
      }
    }

    return new Response(JSON.stringify(itineraryData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Error generating itinerary' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});