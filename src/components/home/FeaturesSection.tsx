import { Clock, Globe, Compass, Smartphone } from "lucide-react";

const features = [
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
];

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-900">
          Viajar Nunca Foi Tão Fácil e Divertido!
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          Com a inteligência artificial, planejamos o roteiro ideal para você,
          economizando tempo e maximizando sua experiência.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition group text-center"
          >
            <div className="mb-6 flex justify-center">{feature.icon}</div>
            <h3 className="font-bold text-xl mb-4 text-emerald-900">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;