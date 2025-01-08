import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Hero from "@/components/home/Hero";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen text-gray-900">
      <Hero />

      {/* Proposta de Valor */}
      <section className="container mx-auto px-4 py-16" aria-labelledby="value-proposition">
        <div className="text-center mb-12">
          <h2 id="value-proposition" className="text-4xl font-bold mb-4 text-emerald-900">
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
              icon: <Clock className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Planejamento Instantâneo",
              description: "Roteiros prontos em segundos.",
            },
            {
              icon: <Globe className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Totalmente Personalizado",
              description: "Cada detalhe feito para você.",
            },
            {
              icon: <Compass className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Descubra o Novo",
              description: "Sugestões exclusivas e locais escondidos.",
            },
            {
              icon: <Smartphone className="text-emerald-600" size={48} aria-hidden="true" />,
              title: "Acesse em Qualquer Lugar",
              description: "Consulte ou edite seu roteiro a qualquer momento.",
            },
          ].map((feature, index) => (
            <article
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group text-center"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="font-bold text-xl mb-4 text-emerald-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <button 
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
            aria-label="Começar a criar seu roteiro de viagem"
          >
            Crie Seu Roteiro Agora
          </button>
        </div>
      </section>

      {/* Experiência Transformadora */}
      <section className="bg-gray-50 py-16" aria-labelledby="experience">
        <div className="container mx-auto px-4 text-center">
          <h2 id="experience" className="text-4xl font-bold mb-6 text-emerald-900">
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
      <section className="bg-gradient-to-br from-emerald-50 to-indigo-100 py-16" aria-labelledby="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="how-it-works" className="text-4xl font-bold mb-4 text-emerald-900">
              Seu Roteiro em 3 Passos Simples
            </h2>
            <p className="text-xl text-gray-600">
              Planeje sua viagem com facilidade e rapidez
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Preencha os Dados da Viagem",
                description: "Escolha seu destino, datas e preferências.",
              },
              {
                icon: <Plane className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Receba Sugestões da IA",
                description: "Um roteiro completo em segundos.",
              },
              {
                icon: <Star className="text-emerald-600" size={48} aria-hidden="true" />,
                title: "Aproveite ao Máximo",
                description: "Viaje sem preocupações com um plano ideal.",
              },
            ].map((step, index) => (
              <article
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
              >
                <div className="mb-6 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-xl mb-4 text-emerald-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Última CTA */}
      <section className="text-emerald py-20" aria-labelledby="cta">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta" className="text-3xl md:text-5xl font-bold emerald-to-pink-gradient-text">
            Pronto para Sua Próxima Aventura?
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
            Deixe nossa IA cuidar de tudo.
          </h3>
          <p className="text-xl mb-10">Experimente grátis agora!</p>
          <div className="flex justify-center space-x-4">
            <button 
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center"
              aria-label="Começar teste gratuito"
            >
              Teste Totalmente Gratuito <ChevronRight className="ml-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ROTEIRIZE JÁ. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;