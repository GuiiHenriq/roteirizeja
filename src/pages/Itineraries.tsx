import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trash2 } from "lucide-react";
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

const getDestinationInitials = (destination: string): string => {
  return destination
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const Itineraries = () => {
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

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

  useEffect(() => {
    fetchItineraries();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { error } = await supabase
        .from('itineraries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Roteiro excluído com sucesso');
      setItineraries(prev => prev.filter(itinerary => itinerary.id !== id));
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      toast.error('Erro ao excluir o roteiro');
    }
  };

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
        {itineraries.map((itinerary) => {
          // Garante que as datas sejam interpretadas corretamente no fuso horário local
          const departureDate = new Date(itinerary.departure_date + 'T12:00:00');
          const returnDate = new Date(itinerary.return_date + 'T12:00:00');

          return (
            <Link
              key={itinerary.id}
              to={`/itineraries/${itinerary.id}`}
              className="hover-scale relative group"
            >
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    <span className="text-3xl font-bold">{getDestinationInitials(itinerary.destination)}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {itinerary.destination}
                    </h3>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDelete(itinerary.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {format(departureDate, "dd MMM")} -{" "}
                      {format(returnDate, "dd MMM, yyyy")}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {itinerary.interests}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Itineraries;