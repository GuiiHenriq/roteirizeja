import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { CreateItineraryForm } from "@/components/itinerary/CreateItineraryForm";
import { ItineraryStatus } from "@/components/itinerary/ItineraryStatus";

const MAX_ITINERARIES = 3;

const CreateItinerary = () => {
  const { user } = useAuth();
  const [itineraryCount, setItineraryCount] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  useEffect(() => {
    const fetchItineraryCount = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count_itineraries')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setItineraryCount(data?.count_itineraries || 0);
      } catch (error) {
        console.error('Error fetching itinerary count:', error);
        toast.error('Erro ao carregar informações do usuário');
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchItineraryCount();
  }, [user]);

  if (isLoadingCount) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Criar Novo Roteiro</h1>
      
      <ItineraryStatus 
        itineraryCount={itineraryCount} 
        maxItineraries={MAX_ITINERARIES} 
      />

      <Card className="p-6">
        <CreateItineraryForm 
          itineraryCount={itineraryCount}
          isLoadingCount={isLoadingCount}
          maxItineraries={MAX_ITINERARIES}
        />
      </Card>
    </div>
  );
};

export default CreateItinerary;