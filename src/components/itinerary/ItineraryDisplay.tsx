import { GeneratedItinerary, ItineraryActivity, DayActivities } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, DollarSign, Pencil } from "lucide-react";
import { EditActivityDialog } from "./EditActivityDialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary;
  itineraryId: string;
}

interface ActivityCardProps {
  title: string;
  activity: ItineraryActivity;
  onActivityUpdate: (updatedActivity: ItineraryActivity) => void;
}

const ActivityCard = ({ title, activity, onActivityUpdate }: ActivityCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card className="bg-white/5 hover:bg-white/10 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{activity.Name}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{activity.Description}</p>
          <div className="flex items-center text-sm text-emerald-500">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>R$ {activity.Cost.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <EditActivityDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        activity={activity}
        onSave={onActivityUpdate}
      />
    </>
  );
};

const DayCard = ({ date, activities, onUpdateActivity }: { 
  date: string; 
  activities: DayActivities;
  onUpdateActivity: (period: keyof DayActivities, activity: ItineraryActivity) => void;
}) => {
  const localDate = new Date(date + 'T12:00:00');

  return (
    <Card className="hover-scale">
      <CardHeader>
        <CardTitle>{format(localDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-yellow-500" />
            <h4 className="font-medium">Manhã</h4>
          </div>
          <ActivityCard 
            title="Manhã" 
            activity={activities.morning} 
            onActivityUpdate={(updatedActivity) => onUpdateActivity('morning', updatedActivity)}
          />
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            <h4 className="font-medium">Tarde</h4>
          </div>
          <ActivityCard 
            title="Tarde" 
            activity={activities.afternoon}
            onActivityUpdate={(updatedActivity) => onUpdateActivity('afternoon', updatedActivity)}
          />
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            <h4 className="font-medium">Noite</h4>
          </div>
          <ActivityCard 
            title="Noite" 
            activity={activities.evening}
            onActivityUpdate={(updatedActivity) => onUpdateActivity('evening', updatedActivity)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ItineraryDisplay = ({ itinerary, itineraryId }: ItineraryDisplayProps) => {
  const [localItinerary, setLocalItinerary] = useState(itinerary);

  if (!localItinerary || !localItinerary.destination || !localItinerary.dates || !Array.isArray(localItinerary.itinerary)) {
    return (
      <div className="text-center text-muted-foreground">
        Dados do roteiro incompletos ou inválidos
      </div>
    );
  }

  const handleActivityUpdate = async (dayIndex: number, period: keyof DayActivities, updatedActivity: ItineraryActivity) => {
    const newItinerary = { ...localItinerary };
    newItinerary.itinerary[dayIndex].activities[period] = updatedActivity;
    
    try {
      // Convert the activity data to a plain object structure
      const formattedItinerary = newItinerary.itinerary.map(day => ({
        day: day.day,
        activities: {
          morning: {
            Name: day.activities.morning.Name,
            Description: day.activities.morning.Description,
            Cost: day.activities.morning.Cost
          },
          afternoon: {
            Name: day.activities.afternoon.Name,
            Description: day.activities.afternoon.Description,
            Cost: day.activities.afternoon.Cost
          },
          evening: {
            Name: day.activities.evening.Name,
            Description: day.activities.evening.Description,
            Cost: day.activities.evening.Cost
          }
        }
      }));

      const { error } = await supabase
        .from('itineraries')
        .update({
          itinerary_data: {
            itinerary: formattedItinerary
          }
        })
        .eq('id', itineraryId);

      if (error) throw error;

      setLocalItinerary(newItinerary);
      toast.success('Atividade atualizada com sucesso!');
    } catch (error) {
      console.error('Error updating activity:', error);
      toast.error('Erro ao atualizar a atividade');
    }
  };

  const startDate = new Date(localItinerary.dates.start + 'T12:00:00');
  const endDate = new Date(localItinerary.dates.end + 'T12:00:00');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{localItinerary.destination}</h2>
        <p className="text-muted-foreground mb-4">
          {format(startDate, "dd 'de' MMMM", { locale: ptBR })} -{" "}
          {format(endDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
        </p>
      </div>
      
      <div className="grid gap-6">
        {localItinerary.itinerary.map((day, index) => (
          <DayCard 
            key={day.day} 
            date={day.day} 
            activities={day.activities}
            onUpdateActivity={(period, activity) => handleActivityUpdate(index, period, activity)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;