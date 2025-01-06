import { useNavigate } from "react-router-dom";
import { ChevronRight, Plane } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/0cab4543-e132-478e-a77e-cc9bddc4941e.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Navigation */}
      <nav className="relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <Plane className="h-8 w-8" />
              <span className="text-2xl font-montserrat font-bold">
                Roteirize Já
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 text-white">
              <a href="#recursos" className="hover:text-emerald-400 transition">
                Recursos
              </a>
              <a href="#como-funciona" className="hover:text-emerald-400 transition">
                Como Funciona
              </a>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Seu Próximo Destino, Planejado Perfeitamente com IA
            </h1>
            <p className="text-xl text-gray-200">
              Chega de complicações para criar roteiros. Nossa IA transforma
              suas ideias em uma viagem inesquecível em poucos cliques.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center"
            >
              Teste Agora 100% Grátis <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;