import React, { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop and Mobile Logo */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors">
            <Plane className="h-8 w-8" />
            <span className="text-3xl font-outfit font-bold">
              ROTEIRIZE<span className="font-thin">JÁ</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-emerald-600" />
            ) : (
              <Menu className="h-6 w-6 text-emerald-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="px-4 py-2 hover:bg-[#8B5CF6]/10 rounded-lg transition text-center"
              >
                Recursos
              </a>
              <a
                href="#"
                className="px-4 py-2 hover:bg-[#8B5CF6]/10 rounded-lg transition text-center"
              >
                Como Funciona
              </a>
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition"
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeHeader;
