import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="text-emerald py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold emerald-to-pink-gradient-text">
          Pronto para Sua Próxima Aventura?
        </h2>
        <h3 className="text-2xl md:text-5xl font-bold mb-8">
          Deixe nossa IA cuidar de tudo.
        </h3>
        <p className="text-xl mb-10">Experimente grátis agora!</p>
        <div className="flex justify-center">
          <button 
            onClick={() => navigate("/register")}
            className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition flex items-center"
          >
            Teste Totalmente Gratuito <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;