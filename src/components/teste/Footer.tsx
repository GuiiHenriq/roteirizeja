import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f2f2f2] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-6">
          <img
            className="h-6"
            alt="Travelfy"
            src="https://c.animaapp.com/iA1lbPU9/img/travelfy-1.svg"
          />
          <p className="text-sm text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus
            viverra ultricies egestas sociis gravida sem. Enim elit massa
            ullamcorper erat.
          </p>
          <div className="flex space-x-4">
            <img
              className="h-8 w-8"
              alt="Facebook"
              src="https://c.animaapp.com/iA1lbPU9/img/facebook@2x.png"
            />
            <img
              className="h-8 w-8"
              alt="Tik tok"
              src="https://c.animaapp.com/iA1lbPU9/img/tiktok@2x.png"
            />
            <img
              className="h-8 w-8"
              alt="Twitter"
              src="https://c.animaapp.com/iA1lbPU9/img/twitter-circled@2x.png"
            />
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 col-span-1 md:col-span-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold">INSTITUCIONAL</h3>
            <ul className="space-y-2">
              <li>Sobre</li>
              <li>Carreiras</li>
              <li>Logística</li>
              <li>Privacidade</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">CONTATO</h3>
            <ul className="space-y-2">
              <li>Ajuda - FAQ</li>
              <li>Imprensa</li>
              <li>Afiliados</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">AJUDA</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Mídias</li>
              <li>Chat ao vivo</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-span-1 lg:col-span-1 space-y-6 bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Assine nossa Newsletter e<br />
              Receba promoções incríveis!
            </h3>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="DIGITE SEU MELHOR E-MAIL"
              className="px-4 py-2 border rounded-lg"
            />
            <button className="flex items-center justify-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
              <img
                className="h-5 w-5"
                alt="Email"
                src="https://c.animaapp.com/iA1lbPU9/img/outgoing-mail-fill0-wght400-grad0-opsz48-1.svg"
              />
              <span>ASSINAR</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © - Roteirize Já - Todos os direitos reservados. 2023
      </div>
    </footer>
  );
};

export default Footer;