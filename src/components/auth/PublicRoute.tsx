import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rotas públicas de usuários autenticados
 * Redireciona para o dashboard se o usuário já estiver logado
 */
const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se o usuário estiver autenticado, redireciona para o dashboard
    if (!isLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Se estiver carregando, mostra um spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não estiver autenticado, renderiza o conteúdo da rota
  return !user ? <>{children}</> : null;
};

export default PublicRoute; 