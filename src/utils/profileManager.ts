import { supabase } from '@/integrations/supabase/client';
import { createProfileWithServiceRole } from '@/integrations/supabase/serviceClient';

// Interface para perfis pendentes
interface PendingProfile {
  id: string;
  name: string;
  email: string;
  created_at: string;
  retryCount: number;
  lastRetry: number;
}

// Chave para armazenar perfis pendentes no localStorage
const PENDING_PROFILES_KEY = 'itinerary_genius_pending_profiles';

/**
 * Salva um perfil pendente no localStorage
 */
export const savePendingProfile = (profile: Omit<PendingProfile, 'retryCount' | 'lastRetry'>) => {
  try {
    // Obter perfis pendentes existentes
    const existingProfiles = getPendingProfiles();
    
    // Verificar se o perfil já existe
    const profileExists = existingProfiles.some(p => p.id === profile.id);
    
    if (!profileExists) {
      // Adicionar novo perfil com contadores de retry
      const newProfile: PendingProfile = {
        ...profile,
        retryCount: 0,
        lastRetry: Date.now()
      };
      
      // Salvar a lista atualizada
      localStorage.setItem(
        PENDING_PROFILES_KEY, 
        JSON.stringify([...existingProfiles, newProfile])
      );
      
      console.log(`Perfil pendente salvo para o usuário ${profile.id}`);
    }
  } catch (error) {
    console.error('Erro ao salvar perfil pendente:', error);
  }
};

/**
 * Obtém a lista de perfis pendentes do localStorage
 */
export const getPendingProfiles = (): PendingProfile[] => {
  try {
    const profiles = localStorage.getItem(PENDING_PROFILES_KEY);
    return profiles ? JSON.parse(profiles) : [];
  } catch (error) {
    console.error('Erro ao obter perfis pendentes:', error);
    return [];
  }
};

/**
 * Remove um perfil pendente do localStorage
 */
export const removePendingProfile = (userId: string) => {
  try {
    const profiles = getPendingProfiles();
    const updatedProfiles = profiles.filter(p => p.id !== userId);
    localStorage.setItem(PENDING_PROFILES_KEY, JSON.stringify(updatedProfiles));
  } catch (error) {
    console.error('Erro ao remover perfil pendente:', error);
  }
};

/**
 * Atualiza o contador de tentativas de um perfil pendente
 */
export const updateProfileRetryCount = (userId: string) => {
  try {
    const profiles = getPendingProfiles();
    const updatedProfiles = profiles.map(profile => {
      if (profile.id === userId) {
        return {
          ...profile,
          retryCount: profile.retryCount + 1,
          lastRetry: Date.now()
        };
      }
      return profile;
    });
    
    localStorage.setItem(PENDING_PROFILES_KEY, JSON.stringify(updatedProfiles));
  } catch (error) {
    console.error('Erro ao atualizar contador de tentativas:', error);
  }
};

/**
 * Cria um perfil de usuário no Supabase
 */
export const createUserProfile = async (
  userId: string, 
  name: string,
  email: string,
  createdAt: string = new Date().toISOString()
) => {
  try {
    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
      
    // Se o perfil já existir, não criar novamente
    if (existingProfile) {
      console.log(`Perfil para usuário ${userId} já existe.`);
      removePendingProfile(userId);
      return true;
    }
    
    // Criar o perfil usando o cliente administrativo
    // Isso contorna as restrições de RLS
    const success = await createProfileWithServiceRole(
      userId,
      name,
      email,
      createdAt
    );
    
    if (!success) {
      throw new Error('Falha ao criar perfil com chave de serviço');
    }
    
    // Perfil criado com sucesso, remover dos pendentes se existir
    removePendingProfile(userId);
    console.log(`Perfil criado com sucesso para usuário ${userId}`);
    return true;
  } catch (error) {
    console.error('Erro ao criar perfil de usuário:', error);
    return false;
  }
};

/**
 * Tenta criar perfis pendentes com backoff exponencial
 */
export const processProfileQueue = async () => {
  const pendingProfiles = getPendingProfiles();
  
  if (pendingProfiles.length === 0) {
    return;
  }
  
  console.log(`Processando ${pendingProfiles.length} perfis pendentes`);
  
  for (const profile of pendingProfiles) {
    // Calcular backoff exponencial (1s, 2s, 4s, 8s, etc.)
    const backoffTime = Math.min(30000, 1000 * Math.pow(2, profile.retryCount));
    const timeSinceLastRetry = Date.now() - profile.lastRetry;
    
    // Só tentar novamente se já passou o tempo de backoff
    if (timeSinceLastRetry >= backoffTime) {
      console.log(`Tentando criar perfil para ${profile.id} (tentativa ${profile.retryCount + 1})`);
      
      const success = await createUserProfile(
        profile.id, 
        profile.name, 
        profile.email, 
        profile.created_at
      );
      
      if (!success) {
        // Atualizar contador de tentativas para backoff
        updateProfileRetryCount(profile.id);
      }
    }
  }
};

/**
 * Verifica se um usuário tem perfil e cria se necessário
 */
export const ensureUserProfile = async (userId: string, userName: string, userEmail: string) => {
  try {
    // Verificar se o perfil já existe
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 = Not found
      console.error('Erro ao verificar perfil existente:', error);
    }
    
    // Se o perfil não existir, criar
    if (!data) {
      return await createUserProfile(userId, userName, userEmail);
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao garantir perfil de usuário:', error);
    return false;
  }
}; 