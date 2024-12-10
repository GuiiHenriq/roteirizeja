import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { AuthContextType } from './types/auth';
import { authService } from './services/auth';

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
    });

    // Inscreve para mudanças de autenticação
    const subscription = authService.subscribeToAuthChanges((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshSession = async () => {
    const session = await authService.refreshSession();
    if (session) {
      setSession(session);
      setUser(session.user);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await authService.signUp(email, password, name);
      toast.success('Cadastro realizado com sucesso! Verifique seu email.');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast.error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await authService.signIn(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/');
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