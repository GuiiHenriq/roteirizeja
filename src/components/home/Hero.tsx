import { ChevronRight, Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (!destination.trim()) {
      toast.error("Por favor, informe o destino desejado.", {
        description: "Este campo é obrigatório para prosseguir.",
      });
      return;
    }
    navigate("/register", { state: { destination } });
  };

  return (
    <div className="relative min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="/logo.svg"
                alt="Roteirize Já"
                className="h-8"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-emerald-600">
                Recursos
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-emerald-600">
                Preços
              </a>
              <a href="#about" className="text-gray-600 hover:text-emerald-600">
                Sobre
              </a>
              <button
                onClick={() => navigate("/login")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Entrar
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#features"
                  className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
                >
                  Recursos
                </a>
                <a
                  href="#pricing"
                  className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
                >
                  Preços
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-600 hover:text-emerald-600"
                >
                  Sobre
                </a>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full text-left px-3 py-2 text-gray-600 hover:text-emerald-600"
                >
                  Entrar
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="relative pt-32 pb-20 lg:pt-44">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Crie roteiros de viagem personalizados com{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Inteligência Artificial
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl">
              Planejamento instantâneo, totalmente personalizado e fácil de usar.
              Comece sua próxima aventura agora mesmo!
            </p>

            <div className="w-full max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Para onde você quer ir?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-6 py-7 text-lg rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center whitespace-nowrap"
                  aria-label="Iniciar planejamento da viagem"
                >
                  Teste Agora 100% Grátis <ChevronRight className="ml-2" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Plane className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Destinos Incríveis</h3>
                  <p className="text-gray-600">Explore lugares únicos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <ChevronRight className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Roteiros Personalizados</h3>
                  <p className="text-gray-600">Feito para você</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Plane className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Suporte 24/7</h3>
                  <p className="text-gray-600">Sempre aqui para ajudar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;