import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const popularDestinations = [
  {
    destination: "Paris, França",
    visit_count: "15.8M",
    image_url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    destination: "Dubai, Emirados Árabes",
    visit_count: "14.7M",
    image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    destination: "Londres, Inglaterra",
    visit_count: "14.2M",
    image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    destination: "Bangkok, Tailândia",
    visit_count: "13.5M",
    image_url: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    destination: "Singapura",
    visit_count: "12.8M",
    image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export const PopularDestinations = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Destinos Populares em 2024</h2>
      <div className="relative px-8">
        <Carousel className="w-full">
          <CarouselContent>
            {popularDestinations.map((destination) => (
              <CarouselItem key={destination.destination} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={destination.image_url}
                      alt={destination.destination}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{destination.destination}</h3>
                      <p className="text-sm opacity-90">{destination.visit_count} visitantes</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
};