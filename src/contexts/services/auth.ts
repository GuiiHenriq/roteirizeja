import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { userSchema, checkRateLimit, sanitizeInput } from '@/utils/validation';
import { initCSRFProtection, addCSRFToken, clearCSRFToken } from '@/utils/security';

// Inicializa proteção CSRF
initCSRFProtection();

export const authService = {
  signUp: async (email: string, password: string, name: string) => {
    try {
      // Rate limiting
      if (!checkRateLimit(`signup_${email}`, 3, 60000)) {
        throw new Error('Muitas tentativas. Tente novamente em alguns minutos.');
      }

      // Validação e sanitização
      const sanitizedData = {
        email: sanitizeInput(email),
        password,
        name: sanitizeInput(name),
      };

      const validatedData = userSchema.parse(sanitizedData);

      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', validatedData.email)
        .single();

      if (existingUser) {
        throw new Error('Este e-mail já está cadastrado.');
      }

      // Adiciona token CSRF
      const secureData = addCSRFToken({
        name: validatedData.name,
      });

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: { 
            name: validatedData.name,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      if (data.user) {
        await supabase.auth.updateUser({
          data: { 
            name: validatedData.name,
            last_login: new Date().toISOString(),
          }
        });

        // Inserir dados na tabela profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: validatedData.name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            count_itineraries: 0,
            is_subscribe: false
          });

        if (profileError) {
          console.error('Erro ao criar perfil:', profileError);
          throw new Error('Erro ao criar perfil do usuário');
        }
      }

      return data;
    } catch (error: any) {
      console.error('Sign Up Error:', error);
      throw new Error(error.message || 'Erro ao realizar cadastro');
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      // Rate limiting
      if (!checkRateLimit(`signin_${email}`, 5, 300000)) {
        throw new Error('Muitas tentativas. Tente novamente em 5 minutos.');
      }

      // Sanitização
      const sanitizedEmail = sanitizeInput(email);

      // Gera novo token CSRF para esta sessão
      const secureData = addCSRFToken({});

      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password,
      });

      if (error) {
        console.error('Sign In Error:', error);
        
        switch (error.message) {
          case 'Email not confirmed':
            throw new Error('Por favor, confirme seu e-mail antes de fazer login.');
          case 'Invalid login credentials':
            throw new Error('E-mail ou senha incorretos.');
          case 'User not found':
            throw new Error('Usuário não encontrado.');
          default:
            throw new Error(error.message || 'Erro ao realizar login');
        }
      }

      if (!data.user?.email_confirmed_at) {
        throw new Error('Por favor, confirme seu e-mail antes de fazer login.');
      }

      // Atualiza os dados do usuário sem o token CSRF
      if (data.user) {
        await supabase.auth.updateUser({
          data: { 
            last_login: new Date().toISOString(),
          }
        });
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Limpa o token CSRF ao fazer logout
      clearCSRFToken();
    } catch (error) {
      throw error;
    }
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
