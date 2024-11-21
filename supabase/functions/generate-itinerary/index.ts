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
                    Name: { type: "string", description: "Name of the morning activity" },
                    Description: { type: "string", description: "Description of the morning activity" },
                    Cost: { type: "number", description: "Cost of the morning activity in USD" }
                  }
                },
                afternoon: {
                  type: "object",
                  required: ["Name", "Description", "Cost"],
                  properties: {
                    Name: { type: "string", description: "Name of the afternoon activity" },
                    Description: { type: "string", description: "Description of the afternoon activity" },
                    Cost: { type: "number", description: "Cost of the afternoon activity in USD" }
                  }
                },
                evening: {
                  type: "object",
                  required: ["Name", "Description", "Cost"],
                  properties: {
                    Name: { type: "string", description: "Name of the evening activity" },
                    Description: { type: "string", description: "Description of the evening activity" },
                    Cost: { type: "number", description: "Cost of the evening activity in USD" }
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

    console.log('Generating itinerary for:', { destination, departureDate, returnDate, interests });

    const prompt = `Create a detailed travel itinerary for ${destination} from ${departureDate} to ${returnDate}.
    Focus on: ${interests || 'General tourism'}
    Please provide activities for morning, afternoon, and evening each day.
    Include name, description, and cost (in BRL) for each activity.
    Make the activities interesting and varied, suitable for the destination.
    Consider local attractions, culture, and typical activities.`;

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
            content: "You are a travel planner that creates detailed itineraries. Generate a complete itinerary following the exact schema provided."
          },
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