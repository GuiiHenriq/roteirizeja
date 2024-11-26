import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PopularDestination {
  destination: string;
  visit_count: number;
  image_url: string;
}

export const PopularDestinations = () => {
  const { data: destinations, isLoading } = useQuery({
    queryKey: ["popularDestinations"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_popular_destinations');
      if (error) throw error;
      return data as PopularDestination[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Destinos Populares</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {destinations?.map((destination) => (
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
                    <p className="text-sm opacity-90">{destination.visit_count} viajantes</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};