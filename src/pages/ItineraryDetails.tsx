import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GeneratedItinerary } from "@/types/itinerary";
import ItineraryDisplay from "@/components/itinerary/ItineraryDisplay";
import { toast } from "sonner";
import api from "@/lib/axios";

const ItineraryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const { data: itineraryData, error } = await supabase
          .from("itineraries")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        // Fetch additional details if needed using axios
        const { data: enrichedData } = await api.get(`/api/itineraries/${id}/enrich`);

        if (itineraryData && enrichedData) {
          setItinerary({
            ...itineraryData.itinerary_data,
            destination: itineraryData.destination,
            dates: {
              start: itineraryData.departure_date,
              end: itineraryData.return_date,
            },
            ...enrichedData,
          } as GeneratedItinerary);
        }
      } catch (error) {
        console.error("Error fetching itinerary:", error);
        toast.error("Erro ao carregar o roteiro");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchItinerary();
    }
  }, [id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!itinerary) {
    return <div>Roteiro não encontrado</div>;
  }

  return <ItineraryDisplay itinerary={itinerary} />;
};

export default ItineraryDetails;