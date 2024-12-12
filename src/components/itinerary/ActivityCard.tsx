import { ItineraryActivity } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { EditActivityDialog } from "./EditActivityDialog";

interface ActivityCardProps {
  title: string;
  activity: ItineraryActivity;
  onActivityUpdate: (updatedActivity: ItineraryActivity) => void;
}

export const ActivityCard = ({ title, activity, onActivityUpdate }: ActivityCardProps) => {
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