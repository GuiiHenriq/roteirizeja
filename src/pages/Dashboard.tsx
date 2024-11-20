import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bem-vindo ao Viajai</h1>
        {user && (
          <Button onClick={() => signOut()} variant="outline">
            Sair
          </Button>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Roteiro</h2>
          <p className="text-muted-foreground mb-4">
            Planeje sua próxima aventura com nosso gerador de roteiros com IA.
          </p>
          <Button onClick={() => navigate("/create-itinerary")} className="w-full">
            Começar
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Meus Roteiros</h2>
          <p className="text-muted-foreground mb-4">
            Visualize e gerencie seus planos de viagem salvos.
          </p>
          <Button onClick={() => navigate("/itineraries")} variant="outline" className="w-full">
            Ver Todos
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Destinos Populares</h2>
          <p className="text-muted-foreground mb-4">
            Explore locais em alta e inspire-se para sua próxima viagem.
          </p>
          <Button onClick={() => navigate("/destinations")} variant="outline" className="w-full">
            Explorar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;