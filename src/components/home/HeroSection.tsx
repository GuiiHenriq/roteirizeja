import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-gradient-to-br from-indigo-50 to-emerald-100 pt-20 pb-12 px-4 md:pt-24 md:pb-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-emerald-900">
            Seu Próximo Destino, Planejado Perfeitamente com IA
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Chega de complicações para criar roteiros. Nossa IA transforma
            suas ideias em uma viagem inesquecível em poucos cliques.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="w-full md:w-auto bg-emerald-600 text-white px-6 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-lg shadow-lg"
          >
            Teste Agora 100% Grátis <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="bg-emerald-100/50 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-xl absolute -z-10 blur-2xl"></div>
          <img
            src="/api/placeholder/400/600"
            alt="App Mockup"
            className="w-[280px] md:w-auto rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
          />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;