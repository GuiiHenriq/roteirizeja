import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    {
      name: "PARIS",
      country: "FRANÇA",
      price: "R$ 3.899,00",
      image: "rectangle-24.svg",
      isPromo: true,
    },
    {
      name: "TÓQUIO",
      country: "JAPÃO",
      price: "R$ 5.899,00",
      image: "rectangle-26.svg",
    },
    {
      name: "NOVA YORK",
      country: "ESTADOS UNIDOS",
      price: "R$ 4.299,00",
      image: "rectangle-28-1.svg",
      isPromo: true,
    },
    {
      name: "BARCELONA",
      country: "ESPANHA",
      price: "R$ 3.599,00",
      image: "rectangle-24.svg",
    },
    {
      name: "DUBAI",
      country: "EMIRADOS ÁRABES",
      price: "R$ 6.299,00",
      image: "rectangle-26.svg",
      isPromo: true,
    },
  ];

  return (
    <section className="w-full px-4 lg:px-8 py-12 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[var(--h4-font-family)] text-center mb-12">
          Destinos Internacionais
        </h2>

        <div className="relative px-4 sm:px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {destinations.map((destination, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white h-full">
                    {destination.isPromo && (
                      <div className="absolute top-4 left-4 bg-[var(--primriarosa)] text-white px-4 py-1 rounded-full text-sm z-10">
                        PROMO
                      </div>
                    )}
                    <img
                      className="w-full h-48 sm:h-64 object-cover"
                      src={`https://c.animaapp.com/iA1lbPU9/img/${destination.image}`}
                      alt={destination.name}
                    />
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-[var(--h5-font-family)] mb-2">{destination.name}</h3>
                      <div className="flex items-center space-x-2 mb-4">
                        <img
                          className="w-4 h-4"
                          alt="Location"
                          src="https://c.animaapp.com/iA1lbPU9/img/location-on-fill0-wght400-grad0-opsz48-1-8.svg"
                        />
                        <span className="text-sm">{destination.country}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex absolute -left-4 lg:-left-8" />
            <CarouselNext className="hidden sm:flex absolute -right-4 lg:-right-8" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};