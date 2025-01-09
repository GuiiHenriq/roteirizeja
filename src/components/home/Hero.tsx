import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Planeje Sua Próxima Aventura
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Crie roteiros de viagem personalizados com inteligência artificial.
            Planejamento instantâneo, totalmente personalizado e fácil de usar.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-colors text-lg font-medium"
          >
            Comece Gratuitamente
          </button>
        </div>
      </div>

      {/* Navigation */}
      <header className="relative z-20">
        <nav className="container mx-auto px-4 py-4" aria-label="Navegação principal">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <span className="text-3xl font-outfit font-bold">
                ROTEIRIZE<span className="font-thin">JÁ</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#recursos"
                className="text-white/90 hover:text-white transition-colors"
              >
                Recursos
              </a>
              <a
                href="#como-funciona"
                className="text-white/90 hover:text-white transition-colors"
              >
                Como Funciona
              </a>
              <button
                onClick={() => navigate("/login")}
                className="text-white/90 hover:text-white transition-colors"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-white text-emerald-600 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Cadastrar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div 
              className="md:hidden fixed top-[72px] left-0 right-0 min-h-[calc(100vh-72px)] bg-gradient-to-b from-gray-900/95 to-gray-900/98 backdrop-blur-lg border-t border-white/10 z-50 animate-fadeIn" 
              role="menu"
            >
              <div className="flex flex-col space-y-4 p-6">
                <a
                  href="#recursos"
                  className="text-white/90 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5"
                  role="menuitem"
                >
                  Recursos
                </a>
                <a
                  href="#como-funciona"
                  className="text-white/90 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5"
                  role="menuitem"
                >
                  Como Funciona
                </a>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white/90 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5 text-left"
                  role="menuitem"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  role="menuitem"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Hero;