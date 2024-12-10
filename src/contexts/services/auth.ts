import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const authService = {
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      console.error('Sign Up Error:', error);
      throw new Error(error.message || 'Erro ao realizar cadastro');
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, name }]);

      if (profileError) {
        console.error('Profile Creation Error:', profileError);
        throw new Error(profileError.message || 'Erro ao criar perfil');
      }
    }

    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign In Error:', error);
      
      // Specific error handling
      switch (error.message) {
        case 'Invalid login credentials':
          throw new Error('E-mail ou senha incorretos. Verifique suas credenciais.');
        case 'User not found':
          throw new Error('Usuário não encontrado. Verifique o e-mail digitado.');
        default:
          throw new Error(error.message || 'Erro ao realizar login');
      }
    }

    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  refreshSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  getInitialSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  subscribeToAuthChanges: (callback: (session: Session | null) => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return subscription;
  }
};
