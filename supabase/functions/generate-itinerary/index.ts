import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const functionSchema = {
  name: "generate_travel_itinerary",
  description: "Generate a travel itinerary with daily activities",
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, departureDate, returnDate, interests } = await req.json();

    // Simplified prompt to reduce tokens
    const prompt = `Crie um roteiro curto para ${destination} de ${departureDate} a ${returnDate}.
    Foco: ${interests}
    Forneça apenas atividades essenciais para manhã, tarde e noite.
    Mantenha descrições concisas.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Você é um planejador de viagens conciso. Mantenha as respostas curtas e objetivas."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        functions: [functionSchema],
        function_call: { name: "generate_travel_itinerary" },
        max_tokens: 1000, // Limitando o número máximo de tokens
        temperature: 0.7 // Reduzindo a temperatura para respostas mais diretas
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (!data.choices?.[0]?.message?.function_call?.arguments) {
      throw new Error('Invalid response format from OpenAI');
    }

    const itineraryData = JSON.parse(data.choices[0].message.function_call.arguments);

    return new Response(JSON.stringify({ itinerary: itineraryData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Ocorreu um erro ao gerar o roteiro' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});