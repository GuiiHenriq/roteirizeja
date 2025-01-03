import React from 'react';

const Features = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Porque escolher a Roteirize Já?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra 
            ultricies egestas sociis gravida sem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Feature Cards */}
          {[
            {
              title: 'Certificada',
              icon: 'https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1-2.svg',
              bgColor: 'bg-blue-600'
            },
            {
              title: 'Múltiplos Destinos',
              icon: 'https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1.svg',
              bgColor: 'bg-purple-600'
            },
            {
              title: '+ de 5.000 clientes',
              icon: 'https://c.animaapp.com/iA1lbPU9/img/explore-fill0-wght400-grad0-opsz48-1-1.svg',
              bgColor: 'bg-green-600'
            }
          ].map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className={`${feature.bgColor} p-6 rounded-full shadow-lg mb-6`}>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="h-12 w-12 text-white"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra 
                ultricies egestas sociis gravida sem.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;