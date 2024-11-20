import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plane, Map, Calendar, Star } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Planeje Viagens Incríveis com IA
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie roteiros personalizados para suas viagens em segundos usando inteligência artificial.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")}>
              Começar Agora
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Fazer Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher o Viajai?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Plane className="w-10 h-10 text-primary" />}
              title="IA Inteligente"
              description="Roteiros personalizados gerados em segundos com base nas suas preferências"
            />
            <FeatureCard
              icon={<Map className="w-10 h-10 text-primary" />}
              title="Destinos Únicos"
              description="Descubra lugares incríveis e experiências autênticas"
            />
            <FeatureCard
              icon={<Calendar className="w-10 h-10 text-primary" />}
              title="Planejamento Fácil"
              description="Interface intuitiva para organizar suas viagens sem complicação"
            />
            <FeatureCard
              icon={<Star className="w-10 h-10 text-primary" />}
              title="Experiência Premium"
              description="Acesso a recursos exclusivos para tornar sua viagem inesquecível"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para começar sua próxima aventura?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de viajantes que já estão usando o Viajai para criar memórias incríveis.
          </p>
          <Button size="lg" onClick={() => navigate("/register")}>
            Criar Conta Gratuita
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="p-6 rounded-lg bg-card text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;