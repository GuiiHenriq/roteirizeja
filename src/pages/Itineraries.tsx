import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SavedItinerary {
  id: string;
  destination: string;
  departure_date: string;
  return_date: string;
  interests: string;
  created_at: string;
}

const Itineraries = () => {
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('itineraries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItineraries(data || []);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
        toast.error('Erro ao carregar os roteiros');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItineraries();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando roteiros...</div>
      </div>
    );
  }

  if (itineraries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Seus Roteiros</h1>
        <div className="text-center text-muted-foreground">
          Você ainda não tem nenhum roteiro salvo.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seus Roteiros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <Link
            key={itinerary.id}
            to={`/itineraries/${itinerary.id}`}
            className="hover-scale"
          >
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {itinerary.destination}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {format(new Date(itinerary.departure_date), "dd MMM")} -{" "}
                    {format(new Date(itinerary.return_date), "dd MMM, yyyy")}
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {itinerary.interests}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;