import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const functionSchema = {
  name: "generate_travel_itinerary",
  description: "Generate a detailed travel itinerary for a trip, with activities for each day divided into Morning, Afternoon, and Evening, including their Name, Description, and Cost.",
  parameters: {
    type: "object",
    required: ["destination", "dates", "itinerary"],
    properties: {
      destination: {
        type: "string",
        description: "The destination of the trip"
      },
      dates: {
        type: "object",
        required: ["start", "end"],
        properties: {
          start: {
            type: "string",
            format: "date",
            description: "The start date of the trip in YYYY-MM-DD format"
          },
          end: {
            type: "string",
            format: "date",
            description: "The end date of the trip in YYYY-MM-DD format"
          }
        }
      },
      itinerary: {
        type: "array",
        description: "List of daily activities during the trip",
        items: {
          type: "object",
          required: ["day", "activities"],
          properties: {
            day: {
              type: "string",
              format: "date",
              description: "The date for this day's itinerary in YYYY-MM-DD format"
            },
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

    const prompt = `Crie um roteiro de viagem detalhado para ${destination}. 
    Datas da viagem: de ${departureDate} até ${returnDate}.
    Interesses do viajante: ${interests}

    Por favor, forneça um roteiro dia a dia incluindo atividades para manhã, tarde e noite.
    Para cada atividade, inclua:
    - Nome da atividade
    - Descrição detalhada
    - Custo estimado em USD
    
    Responda APENAS no formato JSON especificado, sem texto adicional.
    Todas as respostas devem estar em português do Brasil.`;

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
            content: "Você é um planejador de viagens especializado em criar roteiros personalizados. Responda sempre em português do Brasil e siga estritamente o formato JSON especificado na função."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        functions: [functionSchema],
        function_call: { name: "generate_travel_itinerary" },
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