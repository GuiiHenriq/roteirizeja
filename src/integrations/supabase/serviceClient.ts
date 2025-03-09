import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: Este arquivo só deve ser importado em código que roda no servidor
// A chave de serviço NUNCA deve ser exposta ao cliente

// Verificar se estamos em ambiente de servidor
const isServer = typeof window === 'undefined';

// Obter as variáveis de ambiente
// Não use o prefixo VITE_ para variáveis sensíveis, pois elas são expostas ao cliente
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Verificar se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variáveis de ambiente SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não definidas');
}

// Criar o cliente apenas se estivermos no servidor ou em desenvolvimento
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Função para criar um perfil de usuário usando o cliente administrativo
export const createProfileWithServiceRole = async (
  userId: string,
  name: string,
  email: string,
  createdAt: string = new Date().toISOString()
) => {
  try {
    // Verificar se estamos em ambiente de produção e cliente
    if (!isServer && process.env.NODE_ENV === 'production') {
      console.error('Tentativa de usar a chave de serviço no cliente em produção');
      return false;
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        name,
        email,
        created_at: createdAt,
        updated_at: new Date().toISOString(),
        count_itineraries: 0,
        is_subscribe: false
      });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erro ao criar perfil com chave de serviço:', error);
    return false;
  }
}; 