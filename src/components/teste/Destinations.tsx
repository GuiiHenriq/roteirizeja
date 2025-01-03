export const Destinations = () => {
  const destinations = [
    {
      name: "ZURICH",
      country: "SUIÇA",
      price: "R$ 3.456,00",
      image: "rectangle-24.svg",
      isPromo: true,
    },
    {
      name: "LISBOA",
      country: "PORTUGAL",
      price: "R$ 2.766,00",
      image: "rectangle-26.svg",
    },
    {
      name: "RIO",
      country: "RIO DE JANEIRO",
      price: "R$ 4.477,00",
      image: "rectangle-28-1.svg",
    },
  ];

  return (
    <section className="w-full px-4 lg:px-8 py-12 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-[var(--h4-font-family)] text-center mb-12">
          Destinos Internacionais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.name} className="relative rounded-3xl overflow-hidden shadow-lg">
              {destination.isPromo && (
                <div className="absolute top-4 left-4 bg-[var(--primriarosa)] text-white px-4 py-1 rounded-full text-sm">
                  PROMO
                </div>
              )}
              <img
                className="w-full h-64 object-cover"
                src={`https://c.animaapp.com/iA1lbPU9/img/${destination.image}`}
                alt={destination.name}
              />
              <div className="p-6">
                <h3 className="text-xl font-[var(--h5-font-family)] mb-2">{destination.name}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    className="w-4 h-4"
                    alt="Location"
                    src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
                  />
                  <span className="text-sm">{destination.country}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <img
                      className="w-4 h-4"
                      alt="Star"
                      src="https://c.animaapp.com/iA1lbPU9/img/star-5-9.svg"
                    />
                    <span className="text-sm">4.8 (957 Reviews)</span>
                  </div>
                  <div className="bg-[var(--primriaroxo)] text-white px-4 py-2 rounded-full text-sm">
                    {destination.price}
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