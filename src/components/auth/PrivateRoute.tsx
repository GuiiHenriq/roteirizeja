import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isLoading, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      if (!isLoading && !user) {
        // Try to refresh the session before redirecting
        try {
          await refreshSession();
        } catch (error) {
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
          navigate("/login", { 
            state: { from: location.pathname },
            replace: true 
          });
        }
      }
    };

    checkSession();
  }, [user, isLoading, navigate, location, refreshSession]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default PrivateRoute;