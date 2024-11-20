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
                    Cost: { type: "number", description: "Cost in BRL" }
                  }
                },
                afternoon: {
                  type: "object",
                  required: ["Name", "Description", "Cost"],
                  properties: {
                    Name: { type: "string" },
                    Description: { type: "string" },
                    Cost: { type: "number", description: "Cost in BRL" }
                  }
                },
                evening: {
                  type: "object",
                  required: ["Name", "Description", "Cost"],
                  properties: {
                    Name: { type: "string" },
                    Description: { type: "string" },
                    Cost: { type: "number", description: "Cost in BRL" }
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, dates, interests } = await req.json();

    if (!destination || !dates || !dates.start || !dates.end) {
      throw new Error('Missing required fields');
    }

    const prompt = `Crie um roteiro detalhado para ${destination} de ${dates.start} a ${dates.end}.
    Interesses do viajante: ${interests || 'Turismo geral'}
    Forneça atividades para manhã, tarde e noite.
    Mantenha descrições concisas e objetivas.
    Importante: Todos os custos devem ser em Reais (BRL).`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Você é um planejador de viagens especializado. Mantenha as respostas objetivas e use valores em Reais (BRL)."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        functions: [functionSchema],
        function_call: { name: "generate_travel_itinerary" },
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate itinerary');
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.function_call?.arguments) {
      throw new Error('Invalid response format from OpenAI');
    }

    const itineraryData = JSON.parse(data.choices[0].message.function_call.arguments);

    return new Response(JSON.stringify(itineraryData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});