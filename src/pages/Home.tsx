import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import HomeHeader from "@/components/home/HomeHeader";
import HomeHero from "@/components/home/HomeHero";
import CallToAction from "@/components/home/CallToAction";
import { Clock, Globe, Compass, Smartphone, Calendar, Plane, Star } from 'lucide-react';

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
      <HomeHeader />
      <HomeHero />

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

      <CallToAction />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ViagemAI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;