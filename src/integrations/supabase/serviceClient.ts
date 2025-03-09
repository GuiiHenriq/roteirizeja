import { supabase } from '@/integrations/supabase/client';

export const createProfileWithServiceRole = async (
  userId: string,
  name: string,
  email: string,
  createdAt: string = new Date().toISOString()
) => {
  try {
    // Chamar a Edge Function do Supabase
    const { data, error } = await supabase.functions.invoke('create-profile', {
      body: {
        userId,
        name,
        email,
        createdAt
      }
    });

    // Verificar se houve erro
    if (error) {
      console.error('Erro ao chamar a Edge Function:', error);
      return false;
    }

    console.log('Perfil criado com sucesso:', data);
    return true;
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    return false;
  }
}; 