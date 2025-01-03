import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PopularDestinations } from "@/components/dashboard/PopularDestinations";
import { TravelTips } from "@/components/dashboard/TravelTips";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Bem-vindo
          {user?.user_metadata?.name
            ? `, ${user.user_metadata.name}`
            : " ao Roteirize Já"}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Criar Novo Roteiro</h2>
          <p className="text-muted-foreground mb-4">
            Planeje sua próxima aventura com nosso gerador de roteiros com IA.
          </p>
          <Button
            onClick={() => navigate("/create-itinerary")}
            className="w-full"
          >
            Começar
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-card shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Meus Roteiros</h2>
          <p className="text-muted-foreground mb-4">
            Visualize e gerencie seus planos de viagem salvos.
          </p>
          <Button
            onClick={() => navigate("/itineraries")}
            variant="outline"
            className="w-full"
          >
            Ver Todos
          </Button>
        </div>
      </div>

      <PopularDestinations />
      <TravelTips />
    </div>
  );
};

export default Dashboard;
