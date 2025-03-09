import { supabase } from '@/integrations/supabase/client';

// Este arquivo agora usa uma Edge Function do Supabase para operações que requerem a chave de serviço
// A chave de serviço nunca é exposta ao cliente

// Função para criar um perfil de usuário usando a Edge Function do Supabase
export const createProfileWithServiceRole = async (
  userId: string,
  name: string,
  email: string,
  createdAt: string = new Date().toISOString()
) => {
  try {
    // Primeiro, verificar se o perfil já existe
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        console.log('Perfil já existe:', existingProfile);
        return true;
      }
    } catch (checkError) {
      // Ignorar erro se o perfil não existir
      console.log('Verificando perfil existente:', checkError);
    }

    // Tentar chamar a Edge Function do Supabase
    try {
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
        throw error;
      }

      console.log('Perfil criado com sucesso via Edge Function:', data);
      return true;
    } catch (edgeFunctionError) {
      console.warn('Erro na Edge Function, tentando método alternativo:', edgeFunctionError);
      
      // Se a Edge Function falhar, tentar criar o perfil diretamente
      // Isso pode funcionar se o usuário tiver permissões suficientes
      const { error: insertError } = await supabase
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

      if (insertError) {
        console.error('Erro ao criar perfil diretamente:', insertError);
        throw insertError;
      }

      console.log('Perfil criado com sucesso via método alternativo');
      return true;
    }
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    
    // Armazenar os dados do perfil pendente no localStorage para tentar novamente mais tarde
    try {
      const pendingProfiles = JSON.parse(localStorage.getItem('pendingProfiles') || '[]');
      pendingProfiles.push({
        userId,
        name,
        email,
        createdAt,
        timestamp: Date.now()
      });
      localStorage.setItem('pendingProfiles', JSON.stringify(pendingProfiles));
      console.log('Perfil pendente salvo para processamento posterior');
    } catch (storageError) {
      console.error('Erro ao salvar perfil pendente:', storageError);
    }
    
    return false;
  }
};

// Função para processar perfis pendentes
export const processPendingProfiles = async () => {
  try {
    const pendingProfilesString = localStorage.getItem('pendingProfiles');
    if (!pendingProfilesString) return;
    
    const pendingProfiles = JSON.parse(pendingProfilesString);
    if (!pendingProfiles.length) return;
    
    console.log(`Processando ${pendingProfiles.length} perfis pendentes`);
    
    const remainingProfiles = [];
    
    for (const profile of pendingProfiles) {
      try {
        const success = await createProfileWithServiceRole(
          profile.userId,
          profile.name,
          profile.email,
          profile.createdAt
        );
        
        if (!success) {
          // Se falhar, manter na lista de pendentes, mas atualizar o timestamp
          profile.timestamp = Date.now();
          remainingProfiles.push(profile);
        }
      } catch (error) {
        console.error('Erro ao processar perfil pendente:', error);
        // Se ocorrer um erro, manter na lista de pendentes, mas atualizar o timestamp
        profile.timestamp = Date.now();
        remainingProfiles.push(profile);
      }
    }
    
    localStorage.setItem('pendingProfiles', JSON.stringify(remainingProfiles));
    console.log(`Processamento concluído. ${pendingProfiles.length - remainingProfiles.length} perfis processados, ${remainingProfiles.length} pendentes.`);
  } catch (error) {
    console.error('Erro ao processar perfis pendentes:', error);
  }
}; 