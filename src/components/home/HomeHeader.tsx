import React from 'react';
import { Plane, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plane className="text-emerald-600" size={32} />
          <span className="text-2xl font-bold text-emerald-800">
            ViagemAI
          </span>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:text-emerald-600 transition">
            Recursos
          </a>
          <a href="#" className="hover:text-emerald-600 transition">
            Como Funciona
          </a>
          <button 
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-xl hover:bg-gray-100 transition mr-2"
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
    </nav>
  );
};

export default HomeHeader;