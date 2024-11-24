import { GeneratedItinerary, ItineraryActivity, DayActivities } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, DollarSign } from "lucide-react";

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary;
}

const getDestinationInitials = (destination: string): string => {
  return destination
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

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
  // Ensure we have all required data before rendering
  if (!itinerary || !itinerary.destination || !itinerary.dates || !Array.isArray(itinerary.itinerary)) {
    return (
      <div className="text-center text-muted-foreground">
        Dados do roteiro incompletos ou inválidos
      </div>
    );
  }

  const initials = getDestinationInitials(itinerary.destination);

  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary">{initials}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 pt-12">{itinerary.destination}</h2>
        <p className="text-muted-foreground mb-4">
          {format(new Date(itinerary.dates.start), "dd 'de' MMMM", { locale: ptBR })} -{" "}
          {format(new Date(itinerary.dates.end), "dd 'de' MMMM, yyyy", { locale: ptBR })}
        </p>
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