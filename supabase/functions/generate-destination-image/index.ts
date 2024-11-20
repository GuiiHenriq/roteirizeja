import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    })
  }

  try {
    const { destination } = await req.json()
    
    if (!destination) {
      throw new Error('Destination is required')
    }

    console.log('Generating image for destination:', destination)
    
    const prompt = `A beautiful landscape photograph of ${destination}, showing its most iconic landmarks and natural beauty. Photorealistic style, high quality, 16:9 aspect ratio`

    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1792x1024",
        quality: "standard",
      }),
    })

    const data = await openaiResponse.json()
    console.log('OpenAI API response:', data)

    if (!openaiResponse.ok) {
      throw new Error(data.error?.message || 'Failed to generate image')
    }

    return new Response(
      JSON.stringify({ imageUrl: data.data[0].url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in generate-destination-image function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Error generating destination image'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 500 
      }
    )
  }
})