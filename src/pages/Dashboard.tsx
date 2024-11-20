import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Bem-vindo ao Itinerary Genius
        </h1>
        <p className="text-xl text-muted-foreground">
          Crie roteiros de viagem personalizados com a ajuda da IA
        </p>

        {user ? (
          <div className="space-y-4">
            <Button asChild size="lg">
              <Link to="/create-itinerary">Criar Novo Roteiro</Link>
            </Button>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/itineraries">Ver Meus Roteiros</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/profile">Meu Perfil</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link to="/register">Criar Conta</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;