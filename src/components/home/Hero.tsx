import { useNavigate } from "react-router-dom";
import { ChevronRight, Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Hero = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [destination, setDestination] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (!destination.trim()) {
      toast.error("Por favor, informe o destino desejado antes de prosseguir.");
      return;
    }
    navigate("/register", { state: { destination } });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('/lovable-uploads/hero-background.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label="Imagem de fundo mostrando um destino turístico"
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Navigation */}
      <header className="relative z-20">
        <nav className="container mx-auto px-4 py-4" aria-label="Navegação principal">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <Plane className="h-8 w-8" aria-hidden="true" />
              <span className="text-3xl font-outfit font-bold">
                ROTEIRIZE<span className="font-thin">JÁ</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 text-white">
              <a href="#recursos" className="hover:text-emerald-400 transition">
                Recursos
              </a>
              <a
                href="#como-funciona"
                className="hover:text-emerald-400 transition"
              >
                Como Funciona
              </a>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-xl hover:bg-white/10 transition"
                aria-label="Entrar na sua conta"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
                aria-label="Criar uma nova conta"
              >
                Cadastrar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
              aria-expanded={isMenuOpen}
              aria-label="Menu de navegação"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md py-4 px-4 z-50" role="menu">
              <div className="flex flex-col space-y-4">
                <a
                  href="#recursos"
                  className="text-white px-4 py-2 hover:bg-white/10 rounded-lg transition text-center"
                  role="menuitem"
                >
                  Recursos
                </a>
                <a
                  href="#como-funciona"
                  className="text-white px-4 py-2 hover:bg-white/10 rounded-lg transition text-center"
                  role="menuitem"
                >
                  Como Funciona
                </a>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white w-full px-4 py-2 rounded-xl hover:bg-white/10 transition"
                  role="menuitem"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
                  role="menuitem"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Seu Próximo Destino, Planejado Perfeitamente com IA
            </h1>
            <p className="text-xl text-gray-200">
              Chega de complicações para criar roteiros. Nossa IA transforma
              suas ideias em uma viagem inesquecível em poucos cliques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <label htmlFor="destination" className="sr-only">
                  Digite seu destino
                </label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Para onde você quer ir?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-emerald-500"
                  aria-required="true"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center whitespace-nowrap"
                aria-label="Iniciar planejamento da viagem"
              >
                Teste Agora 100% Grátis <ChevronRight className="ml-2" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;