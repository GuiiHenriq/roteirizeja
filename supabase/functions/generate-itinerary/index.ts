import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ItineraryDay {
  day: number;
  activities: {
    time: string;
    description: string;
  }[];
}

interface ItineraryResponse {
  days: ItineraryDay[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, departureDate, returnDate, interests } = await req.json();

    const functionSchema = {
      name: "generate_itinerary",
      description: "Generate a travel itinerary based on user preferences",
      parameters: {
        type: "object",
        properties: {
          days: {
            type: "array",
            description: "Array of daily itineraries",
            items: {
              type: "object",
              properties: {
                day: {
                  type: "integer",
                  description: "Day number of the itinerary"
                },
                activities: {
                  type: "array",
                  description: "Array of activities for the day",
                  items: {
                    type: "object",
                    properties: {
                      time: {
                        type: "string",
                        description: "Time of the activity (e.g., 'Morning', '9:00 AM')"
                      },
                      description: {
                        type: "string",
                        description: "Description of the activity"
                      }
                    },
                    required: ["time", "description"]
                  }
                }
              },
              required: ["day", "activities"]
            }
          }
        },
        required: ["days"]
      }
    };

    console.log("Sending request to OpenAI with structured output format");

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
            content: "You are a travel planner that generates detailed itineraries. Always respond with valid JSON following the specified format."
          },
          {
            role: "user",
            content: `Create a detailed day-by-day travel itinerary for a trip to ${destination}. 
            Trip dates: from ${departureDate} to ${returnDate}.
            Traveler interests: ${interests}
            
            Include:
            - Recommended activities and attractions
            - Suggested restaurants and local cuisine
            - Transportation tips
            - Time management suggestions`
          }
        ],
        functions: [functionSchema],
        function_call: { name: "generate_itinerary" }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (!data.choices?.[0]?.function_call?.arguments) {
      console.error("Invalid OpenAI response format:", data);
      throw new Error('Invalid response format from OpenAI');
    }

    try {
      // Parse the function call arguments as JSON
      const itineraryData: ItineraryResponse = JSON.parse(data.choices[0].function_call.arguments);
      return new Response(JSON.stringify(itineraryData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      throw new Error('Failed to parse OpenAI response as JSON');
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred while generating the itinerary' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});