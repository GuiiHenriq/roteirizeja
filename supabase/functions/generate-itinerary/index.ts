import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, departureDate, returnDate, interests } = await req.json();

    const prompt = `Create a detailed day-by-day travel itinerary for a trip to ${destination}. 
    Trip dates: from ${departureDate} to ${returnDate}.
    Traveler interests: ${interests}

    Please provide the response in the following JSON format:
    {
      "days": [
        {
          "day": 1,
          "activities": [
            {
              "time": "Morning",
              "description": "Activity description"
            },
            {
              "time": "Afternoon",
              "description": "Activity description"
            },
            {
              "time": "Evening",
              "description": "Activity description"
            }
          ]
        }
      ]
    }

    Make sure to include:
    - Recommended activities and attractions
    - Suggested restaurants and local cuisine
    - Transportation tips
    - Time management suggestions`;

    console.log("Sending request to OpenAI with prompt:", prompt);

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
            content: "You are a travel planner that generates detailed itineraries in JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("OpenAI response:", data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Parse the response content as JSON
    const itineraryData = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify({ 
      itinerary: itineraryData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

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