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

    const prompt = `Crie um roteiro de viagem detalhado para ${destination}. 
    Datas da viagem: de ${departureDate} até ${returnDate}.
    Interesses do viajante: ${interests}

    Por favor, forneça um roteiro dia a dia incluindo:
    - Atividades e atrações recomendadas
    - Restaurantes sugeridos e culinária local
    - Dicas de transporte
    - Sugestões de horários
    - Costumes locais e considerações culturais
    
    Formate a resposta em uma estrutura clara e fácil de ler.`;

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
            content: "Você é um planejador de viagens especializado em criar roteiros personalizados. Responda sempre em português do Brasil."
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

    return new Response(JSON.stringify({ 
      itinerary: data.choices[0].message.content 
    }), {
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