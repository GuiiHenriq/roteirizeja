import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HomeHero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  return (
    <header className="bg-gradient-to-br from-indigo-50 to-emerald-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="md:flex items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-emerald-900">
              Seu Próximo Destino, Planejado Perfeitamente com IA
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Chega de complicações para criar roteiros. Nossa IA transforma
              suas ideias em uma viagem inesquecível em poucos cliques.
            </p>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Para onde você quer viajar?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-600"
                required
              />
              <button
                onClick={() => navigate("/register")}
                className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center"
              >
                Teste Agora 100% Grátis <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:flex justify-center relative">
            <div className="bg-emerald-100/50 w-[500px] h-[500px] rounded-xl absolute -z-10 blur-2xl"></div>
            <img
              src="/api/placeholder/400/600"
              alt="App Mockup"
              className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;