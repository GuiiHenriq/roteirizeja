import { DayActivities } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityCard } from "./ActivityCard";

interface DayCardProps {
  date: string;
  activities: DayActivities;
  onUpdateActivity: (period: keyof DayActivities, updatedActivity: any) => void;
}

export const DayCard = ({ date, activities, onUpdateActivity }: DayCardProps) => {
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