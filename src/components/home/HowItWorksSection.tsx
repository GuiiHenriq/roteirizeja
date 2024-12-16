import { Calendar, Plane, Star } from "lucide-react";

const steps = [
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
];

const HowItWorksSection = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-indigo-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-900">
            Seu Roteiro em 3 Passos Simples
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Planeje sua viagem com facilidade e rapidez
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
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
  );
};

export default HowItWorksSection;