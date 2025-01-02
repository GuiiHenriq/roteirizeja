import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

export const authService = {
  signUp: async (email: string, password: string, name: string) => {
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          name,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    if (error) {
      console.error('Sign Up Error:', error);
      throw new Error(error.message || 'Erro ao realizar cadastro');
    }

    if (data.user) {
      // Update user metadata with display name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (updateError) {
        console.error('Update User Error:', updateError);
        throw new Error(updateError.message || 'Erro ao atualizar nome do usuário');
      }

      // Create profile entry
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
        case 'Email not confirmed':
          throw new Error('Por favor, confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.');
        case 'Invalid login credentials':
          throw new Error('E-mail ou senha incorretos. Verifique suas credenciais.');
        case 'User not found':
          throw new Error('Usuário não encontrado. Verifique o e-mail digitado.');
        default:
          throw new Error(error.message || 'Erro ao realizar login');
      }
    }

    // Check if email is confirmed
    if (!data.user?.email_confirmed_at) {
      throw new Error('Por favor, confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada.');
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
  },

  updateUserName: async (name: string) => {
    try {
      // Update auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      });

      if (updateError) throw updateError;

      // Update profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (profileError) throw profileError;

      return true;
    } catch (error: any) {
      console.error('Error updating user name:', error);
      throw new Error(error.message || 'Erro ao atualizar nome do usuário');
    }
  }
};
