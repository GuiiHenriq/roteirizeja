import React from 'react';
import { Plane } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://c.animaapp.com/iA1lbPU9/img/image-5.png)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <nav className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-[#8B5CF6] hover:text-[#7C3AED] transition-colors mb-4 md:mb-0">
            <Plane className="h-8 w-8" />
            <span className="text-2xl font-montserrat font-bold">Roteirize Já</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button className="nav-link">INICIO</button>
            <button className="nav-link">DESTINOS</button>
            <button className="nav-link">PACOTES</button>
            <button className="nav-link">CLIENTES</button>
            <button className="nav-link">CONTATO</button>
            <button className="nav-link bg-primary text-white px-6 rounded-lg">LOGIN</button>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <img
              className="max-w-full h-auto"
              alt="Descubra o mundo"
              src="https://c.animaapp.com/iA1lbPU9/img/descubra-o-mundo-com-a-travelfy-.png"
            />
            <p className="text-white text-lg max-w-xl">
              Lorem ipsum dolor sit amet consectetur. Nulla consectetur dignissim lacus 
              arcu tincidunt nisl dolor maecenas.
            </p>
            <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
              <img
                className="h-6 w-6"
                alt="Travel"
                src="https://c.animaapp.com/iA1lbPU9/img/travel-explore-fill0-wght400-grad0-opsz48-1.svg"
              />
              <span>EXPLORAR DESTINOS</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block font-semibold">DESTINO</label>
                <input
                  type="text"
                  placeholder="Para onde quer ir?"
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-semibold">DATAS</label>
                <input
                  type="text"
                  placeholder="Quando quer ir?"
                  className="w-full px-4 py-2 rounded-lg border"
                />
              </div>
              <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary/90">
                <img
                  className="h-5 w-5"
                  alt="Search"
                  src="https://c.animaapp.com/iA1lbPU9/img/search-fill0-wght400-grad0-opsz48-1.svg"
                />
                <span>BUSCAR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;