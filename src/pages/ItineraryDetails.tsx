import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ItineraryDisplay from "@/components/itinerary/ItineraryDisplay";
import { GeneratedItinerary } from "@/types/itinerary";

const ItineraryDetails = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('itinerary_data')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data?.itinerary_data) {
          setItinerary(data.itinerary_data as unknown as GeneratedItinerary);
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error);
        toast.error('Erro ao carregar o roteiro');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchItinerary();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando roteiro...</div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          Roteiro não encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ItineraryDisplay itinerary={itinerary} />
      </div>
    </div>
  );
};

export default ItineraryDetails;