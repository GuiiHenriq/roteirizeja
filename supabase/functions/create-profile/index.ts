import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// Esta função roda no ambiente seguro do Supabase, com acesso à chave de serviço
serve(async (req) => {
  // Configurar CORS para permitir requisições da sua aplicação
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }

  // Verificar método HTTP
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Método não permitido' }),
      { 
        status: 405,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }

  try {
    // Obter dados do corpo da requisição
    const { userId, name, email, createdAt = new Date().toISOString() } = await req.json()

    // Validar dados
    if (!userId || !name || !email) {
      return new Response(
        JSON.stringify({ error: 'Dados incompletos' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Criar cliente Supabase com a chave de serviço
    // Aqui usamos Deno.env para acessar variáveis de ambiente
    // Estas variáveis são configuradas automaticamente pelo Supabase
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Verificar se o perfil já existe
    const { data: existingProfile, error: queryError } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 = Not found
      console.error('Erro ao verificar perfil existente:', queryError)
      return new Response(
        JSON.stringify({ error: 'Erro ao verificar perfil existente' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Se o perfil já existir, retornar sucesso
    if (existingProfile) {
      return new Response(
        JSON.stringify({ success: true, message: 'Perfil já existe' }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Criar o perfil
    const { error: insertError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        name,
        email,
        created_at: createdAt,
        updated_at: new Date().toISOString(),
        count_itineraries: 0,
        is_subscribe: false
      })

    if (insertError) {
      console.error('Erro ao criar perfil:', insertError)
      return new Response(
        JSON.stringify({ error: 'Erro ao criar perfil' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Retornar sucesso
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  } catch (error) {
    console.error('Erro no servidor:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
}) 