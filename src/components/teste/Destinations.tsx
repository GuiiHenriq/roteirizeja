import React from 'react';

const Destinations = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Destinos Internacionais</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Aliquet malesuada tellus viverra 
            ultricies egestas sociis gravida sem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Destination Card */}
          {['Zurich', 'Lisboa', 'Paris'].map((city) => (
            <div key={city} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={`https://c.animaapp.com/iA1lbPU9/img/rectangle-${city === 'Zurich' ? '24' : city === 'Lisboa' ? '26' : '28'}.svg`}
                  alt={city}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm">
                    PROMO
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{city}</h3>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <img
                        className="h-4 w-4"
                        alt="Location"
                        src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
                      />
                      <span className="text-sm">
                        {city === 'Zurich' ? 'SUÍÇA' : city === 'Lisboa' ? 'PORTUGAL' : 'FRANÇA'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <img
                        className="h-4 w-4"
                        alt="Star"
                        src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
                      />
                      <span className="text-sm">4.8</span>
                      <span className="text-sm text-gray-500">(957)</span>
                    </div>
                    <div className="mt-2">
                      <span className="bg-[#8B5CF6] text-white px-4 py-2 rounded-lg">
                        R$ {city === 'Zurich' ? '3.456' : city === 'Lisboa' ? '2.766' : '4.477'},00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;