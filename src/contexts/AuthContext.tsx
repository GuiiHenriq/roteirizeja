import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { AuthContextType } from './types/auth';
import { authService } from './services/auth';
import { processPendingProfiles } from '@/integrations/supabase/serviceClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializa a sessão
    authService.getInitialSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Processar perfis pendentes ao iniciar
      processPendingProfiles();
    });

    // Inscreve para mudanças de autenticação
    const subscription = authService.subscribeToAuthChanges((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Se o usuário estiver logado, processar perfis pendentes
      if (session?.user) {
        processPendingProfiles();
      }
    });

    // Configurar um intervalo para processar perfis pendentes periodicamente
    const intervalId = setInterval(() => {
      processPendingProfiles();
    }, 60000); // Tentar a cada minuto

    return () => {
      subscription.unsubscribe();
      clearInterval(intervalId);
    };
  }, []);

  const refreshSession = async () => {
    const session = await authService.refreshSession();
    if (session) {
      setSession(session);
      setUser(session.user);
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const result = await authService.resendConfirmationEmail(email);
      toast.success('E-mail de confirmação reenviado com sucesso!');
      return result;
    } catch (error: any) {
      console.error('Erro ao reenviar e-mail:', error);
      toast.error(error.message);
      return false;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await authService.signUp(email, password, name);
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast.error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await authService.signIn(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
      
      // Processar perfis pendentes após login bem-sucedido
      processPendingProfiles();
    } catch (error: any) {
      console.error('Erro no login:', error);
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setSession(null);
      setUser(null);
      navigate('/login');
      toast.success('Sessão encerrada com sucesso!');
    } catch (error: any) {
      console.error('Erro ao sair:', error);
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        signUp, 
        signIn, 
        signOut, 
        refreshSession,
        resendConfirmationEmail,
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}