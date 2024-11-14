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

    const prompt = `Create a detailed travel itinerary for a trip to ${destination}. 
    Trip dates: from ${departureDate} to ${returnDate}.
    Traveler interests: ${interests}

    Please provide a day-by-day itinerary including:
    - Recommended activities and attractions
    - Suggested restaurants and local cuisine
    - Transportation tips
    - Time management suggestions
    - Local customs and cultural considerations
    
    Format the response in a clear, easy-to-read structure.`;

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
            content: "You are a knowledgeable travel planner with expertise in creating personalized travel itineraries."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({ 
      itinerary: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});