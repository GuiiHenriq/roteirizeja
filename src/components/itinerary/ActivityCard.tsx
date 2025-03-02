import { ItineraryActivity } from "@/types/itinerary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { EditActivityDialog } from "./EditActivityDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ActivityCardProps {
  title: string;
  activity: ItineraryActivity;
  onActivityUpdate: (updatedActivity: ItineraryActivity) => void;
}

export const ActivityCard = ({ title, activity, onActivityUpdate }: ActivityCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Verificar se o usuário tem assinatura ativa
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("is_subscribe")
          .eq("id", user.id)
          .single();
        
        if (error) {
          console.error("Erro ao verificar status de assinatura:", error);
          return;
        }
        
        setIsSubscribed(data?.is_subscribe || false);
      } catch (err) {
        console.error("Erro ao verificar status de assinatura:", err);
      }
    };
    
    checkSubscriptionStatus();
  }, [user]);

  return (
    <>
      <Card className="bg-white/5 hover:bg-white/10 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{activity.Name}</CardTitle>
            {isSubscribed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
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

      {isSubscribed && (
        <EditActivityDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          activity={activity}
          onSave={onActivityUpdate}
        />
      )}
    </>
  );
};