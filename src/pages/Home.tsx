import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Clock,
  Compass,
  Star,
  Plane,
  Check,
  ChevronRight,
  Smartphone,
  Globe,
  Calendar,
} from "lucide-react";
import HomeHeader from "@/components/home/HomeHeader";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const [destination, setDestination] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDestinationSubmit = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDestination("");
  };

  return (
    <div className="min-h-screen text-gray-900">
      <HomeHeader />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-indigo-50 to-emerald-100 pt-24 pb-16">
        <div className="container mx-auto px-4 flex items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-bold leading-tight text-emerald-900">
              Seu Próximo Destino, Planejado Perfeitamente com IA
            </h1>
            <p className="text-xl text-gray-600">
              Chega de complicações para criar roteiros. Nossa IA transforma
              suas ideias em uma viagem inesquecível em poucos cliques.
            </p>
            <form onSubmit={handleDestinationSubmit} className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="Para onde você quer viajar?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="flex-grow px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-600"
                required
              />
              <button
                onClick={() => navigate("/register")}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center"
              >
                Teste Agora 100% Grátis <ChevronRight className="ml-2" />
              </button>
            </form>
          </div>
          <div className="md:w-1/2 hidden md:flex justify-center relative">
            <div className="bg-emerald-100/50 w-[500px] h-[500px] rounded-xl absolute -z-10 blur-2xl"></div>
            <img
              src="/api/placeholder/400/600"
              alt="App Mockup"
              className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </header>

      {/* Proposta de Valor */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-emerald-900">
            Viajar Nunca Foi Tão Fácil e Divertido!
          </h2>
          <p className="text-xl text-gray-600">
            Com a inteligência artificial, planejamos o roteiro ideal para você,
            economizando tempo e maximizando sua experiência.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Clock className="text-emerald-600" size={48} />,
              title: "Planejamento Instantâneo",
              description: "Roteiros prontos em segundos.",
            },
            {
              icon: <Globe className="text-emerald-600" size={48} />,
              title: "Totalmente Personalizado",
              description: "Cada detalhe feito para você.",
            },
            {
              icon: <Compass className="text-emerald-600" size={48} />,
              title: "Descubra o Novo",
              description: "Sugestões exclusivas e locais escondidos.",
            },
            {
              icon: <Smartphone className="text-emerald-600" size={48} />,
              title: "Acesse em Qualquer Lugar",
              description: "Consulte ou edite seu roteiro a qualquer momento.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group text-center"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-4 text-emerald-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition">
            Crie Seu Roteiro Agora
          </button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 1
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 2
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100-4m0 4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 3
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100-4m0 4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 4
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100-4m0 4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 5
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-3xl shadow-inner">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100-4m0 4a2 2 0 110-4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
              Feature 6
            </h3>
            <p className="text-gray-500 text-center">
              Generic description of the feature.
            </p>
          </div>
        </div>
      </section>

      {/* Experiência Transformadora */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-emerald-900">
            Deixe Sua Viagem Fluir com Perfeição
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Sabemos o quanto planejar uma viagem pode ser estressante e
            demorado. Com nosso app, você tem a tranquilidade de um roteiro
            perfeito na palma da sua mão, para aproveitar cada segundo do seu
            destino.
          </p>
          <p className="text-2xl italic text-emerald-700 font-semibold">
            "Mais momentos incríveis, menos preocupações."
          </p>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="bg-gradient-to-br from-emerald-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-emerald-900">
              Seu Roteiro em 3 Passos Simples
            </h2>
            <p className="text-xl text-gray-600">
              Planeje sua viagem com facilidade e rapidez
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="text-emerald-600" size={48} />,
                title: "Preencha os Dados da Viagem",
                description: "Escolha seu destino, datas e preferências.",
              },
              {
                icon: <Plane className="text-emerald-600" size={48} />,
                title: "Receba Sugestões da IA",
                description: "Um roteiro completo em segundos.",
              },
              {
                icon: <Star className="text-emerald-600" size={48} />,
                title: "Aproveite ao Máximo",
                description: "Viaje sem preocupações com um plano ideal.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
              >
                <div className="mb-6 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-xl mb-4 text-emerald-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Última CTA */}
      <section className="text-emerald py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold emerald-to-pink-gradient-text">
            Pronto para Sua Próxima Aventura?
          </h2>
          <h3 className="text-5xl font-bold mb-8">
            Deixe nossa IA cuidar de tudo.
          </h3>
          <p className="text-xl mb-10">Experimente grátis agora!</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center">
              Teste Totalmente Gratuito <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ViagemAI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 rounded-lg bg-card text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;
