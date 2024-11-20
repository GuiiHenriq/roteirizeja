import { GeneratedItinerary, ItineraryActivity, DayActivities } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary;
}

const ActivityCard = ({ title, activity }: { title: string; activity: ItineraryActivity }) => (
  <Card className="bg-white/5 hover:bg-white/10 transition-colors">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">{activity.Name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-2">{activity.Description}</p>
      <div className="flex items-center text-sm text-primary">
        <DollarSign className="w-4 h-4 mr-1" />
        <span>R$ {activity.Cost.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
);

const DayCard = ({ date, activities }: { date: string; activities: DayActivities }) => (
  <Card className="hover-scale">
    <CardHeader>
      <CardTitle>{format(new Date(date), "dd 'de' MMMM, yyyy", { locale: ptBR })}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-2 text-yellow-500" />
          <h4 className="font-medium">Manhã</h4>
        </div>
        <ActivityCard title="Manhã" activity={activities.morning} />
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-2 text-orange-500" />
          <h4 className="font-medium">Tarde</h4>
        </div>
        <ActivityCard title="Tarde" activity={activities.afternoon} />
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-2 text-blue-500" />
          <h4 className="font-medium">Noite</h4>
        </div>
        <ActivityCard title="Noite" activity={activities.evening} />
      </div>
    </CardContent>
  </Card>
);

const ItineraryDisplay = ({ itinerary }: ItineraryDisplayProps) => {
  const [destinationImage, setDestinationImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setIsLoadingImage(true);
        console.log('Calling generate-destination-image function...');
        
        const { data, error } = await supabase.functions.invoke('generate-destination-image', {
          body: { destination: itinerary.destination }
        });

        console.log('Function response:', { data, error });

        if (error) {
          console.error('Supabase function error:', error);
          throw error;
        }

        if (!data?.imageUrl) {
          throw new Error('No image URL received from the function');
        }

        setDestinationImage(data.imageUrl);
      } catch (error) {
        console.error('Error generating image:', error);
        toast.error('Não foi possível gerar a imagem do destino. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoadingImage(false);
      }
    };

    if (itinerary.destination) {
      generateImage();
    }
  }, [itinerary.destination]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Roteiro para {itinerary.destination}</h2>
        <p className="text-muted-foreground mb-4">
          {format(new Date(itinerary.dates.start), "dd 'de' MMMM", { locale: ptBR })} -{" "}
          {format(new Date(itinerary.dates.end), "dd 'de' MMMM, yyyy", { locale: ptBR })}
        </p>
        
        {isLoadingImage ? (
          <div className="w-full h-64 bg-muted animate-pulse rounded-lg" />
        ) : destinationImage && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img
              src={destinationImage}
              alt={`Paisagem de ${itinerary.destination}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <div className="grid gap-6">
        {itinerary.itinerary.map((day) => (
          <DayCard key={day.day} date={day.day} activities={day.activities} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;