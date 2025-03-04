import { useNavigate } from "react-router-dom";
import { MapPin, Home, ArrowLeft, Compass } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-8">
        <div className="max-w-5xl w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
                {/* 404 Illustration */}
                <motion.div 
                  className="w-full md:w-1/2 flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <motion.div
                      className="text-9xl md:text-[10rem] font-bold text-emerald-600/20"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [-2, 2, -2]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 5,
                        ease: "easeInOut"
                      }}
                    >
                      404
                    </motion.div>
                    <motion.div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{ 
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      <MapPin className="h-16 w-16 md:h-20 md:w-20 text-emerald-600" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Destino não encontrado
                  </motion.h1>
                  <motion.p 
                    className="text-lg md:text-xl text-gray-600 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Parece que você se perdeu no caminho. A página que você está procurando não existe ou foi movida para outro destino.
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.button
                      onClick={() => navigate("/")}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center shadow-lg shadow-emerald-600/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Home className="mr-2 h-5 w-5" />
                      Voltar para o início
                    </motion.button>
                    <motion.button
                      onClick={() => navigate(-1)}
                      className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Voltar
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <motion.div 
            className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">Talvez você esteja procurando por:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.button
                onClick={() => navigate("/")}
                className="text-left p-4 md:p-6 rounded-lg hover:bg-gray-50 transition flex items-start"
                whileHover={{ x: 5 }}
              >
                <div className="bg-emerald-100 p-2 md:p-3 rounded-lg mr-3">
                  <Home className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">Página Inicial</h3>
                  <p className="text-sm md:text-base text-gray-600">Volte para a página principal</p>
                </div>
              </motion.button>
              <motion.button
                onClick={() => navigate("/register")}
                className="text-left p-4 md:p-6 rounded-lg hover:bg-gray-50 transition flex items-start"
                whileHover={{ x: 5 }}
              >
                <div className="bg-emerald-100 p-2 md:p-3 rounded-lg mr-3">
                  <Compass className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">Criar Conta</h3>
                  <p className="text-sm md:text-base text-gray-600">Registre-se para começar a planejar</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Roteirize Já. Todos os direitos reservados.</p>
          <div className="mt-2">
            <a href="/terms" className="text-emerald-600 hover:underline">Termos e Condições</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound; 