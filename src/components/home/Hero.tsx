import { useNavigate } from "react-router-dom";
import { ChevronRight, Plane, Menu, X, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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

  const scrollToContent = () => {
    const contentElement = document.getElementById('recursos');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[85vh] md:h-[80vh] flex flex-col">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" /> {/* Gradient Overlay */}
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
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition shadow-md hover:shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50"
                aria-label="Criar uma nova conta"
              >
                Cadastrar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 hover:bg-emerald-500/20 rounded-lg transition-all duration-300 border border-white/20 backdrop-blur-sm"
              aria-expanded={isMenuOpen}
              aria-label="Menu de navegação"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isMenuOpen ? {} : {
                boxShadow: ["0px 0px 0px rgba(16,185,129,0)", "0px 0px 8px rgba(16,185,129,0.6)", "0px 0px 0px rgba(16,185,129,0)"]
              }}
              transition={isMenuOpen ? {} : {
                boxShadow: { repeat: Infinity, duration: 2, repeatDelay: 1 }
              }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden absolute top-full left-0 right-0 bg-emerald-900/90 backdrop-blur-md py-6 px-4 z-50 border-t border-emerald-700/50 shadow-lg" 
                role="menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex flex-col space-y-4 max-w-md mx-auto"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  <motion.a
                    href="#recursos"
                    className="text-white px-4 py-3 hover:bg-emerald-800/50 rounded-lg transition-all duration-300 text-center flex items-center justify-center space-x-2"
                    role="menuitem"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                    }}
                    whileHover={{ backgroundColor: "rgba(6, 95, 70, 0.5)" }}
                  >
                    <span>Recursos</span>
                  </motion.a>
                  <motion.a
                    href="#como-funciona"
                    className="text-white px-4 py-3 hover:bg-emerald-800/50 rounded-lg transition-all duration-300 text-center flex items-center justify-center space-x-2"
                    role="menuitem"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                    }}
                    whileHover={{ backgroundColor: "rgba(6, 95, 70, 0.5)" }}
                  >
                    <span>Como Funciona</span>
                  </motion.a>
                  <motion.div 
                    className="border-t border-emerald-700/30 pt-4 mt-2"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.3 } }
                    }}
                  ></motion.div>
                  <motion.button
                    onClick={() => navigate("/login")}
                    className="text-white w-full px-4 py-3 rounded-xl hover:bg-emerald-800/50 transition-all duration-300 flex items-center justify-center space-x-2"
                    role="menuitem"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                    }}
                    whileHover={{ backgroundColor: "rgba(6, 95, 70, 0.5)" }}
                  >
                    <span>Entrar</span>
                  </motion.button>
                  <motion.button
                    onClick={() => navigate("/register")}
                    className="w-full bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-[0_4px_14px_0_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_0_rgba(16,185,129,0.6)] font-medium flex items-center justify-center space-x-2"
                    role="menuitem"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
                    }}
                  >
                    <span>Cadastrar</span>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6 text-white text-center md:text-left md:mx-0">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Seu Próximo Destino, Planejado Perfeitamente<br/>com IA
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Chega de complicações para criar roteiros. Nossa IA transforma
              suas ideias em uma viagem inesquecível em poucos cliques.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
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
                  className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-emerald-500 h-12"
                  aria-required="true"
                />
              </div>
              <motion.button
                onClick={handleSearch}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center whitespace-nowrap h-12 shadow-lg shadow-emerald-600/40 hover:shadow-emerald-600/60"
                aria-label="Iniciar planejamento da viagem"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(16, 185, 129, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 4px 12px rgba(16, 185, 129, 0.2)",
                    "0 8px 20px rgba(16, 185, 129, 0.4)",
                    "0 4px 12px rgba(16, 185, 129, 0.2)"
                  ]
                }}
                transition={{ 
                  boxShadow: { repeat: Infinity, duration: 2 }
                }}
              >
                Teste Agora 100% Grátis <ChevronRight className="ml-2" aria-hidden="true" />
              </motion.button>
            </motion.div>
            
            {/* Badges */}
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">Roteiros Personalizados</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">Inteligência Artificial</span>
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">Experiência Única</span>
            </motion.div>
          </div>
        </div>
      </main>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <motion.button
          onClick={scrollToContent}
          className="text-white flex flex-col items-center"
          whileHover={{ y: 5 }}
          animate={{ y: [0, 5, 0] }}
          transition={{ y: { repeat: Infinity, duration: 1.5 } }}
          aria-label="Rolar para ver mais conteúdo"
        >
          <span className="text-sm font-medium mb-2">Descubra mais</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;