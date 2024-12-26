import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateItineraryForm } from "@/components/itinerary/CreateItineraryForm";
import { ItineraryStatus } from "@/components/itinerary/ItineraryStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const MAX_ITINERARIES = 3;

const CreateItinerary = () => {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('count_itineraries')
        .eq('id', user?.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const hasReachedLimit = (profile?.count_itineraries || 0) >= MAX_ITINERARIES;

  return (
    <div className="px-4 py-6 lg:py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
        Criar Novo Roteiro
      </h1>
      
      <ItineraryStatus 
        itineraryCount={profile?.count_itineraries || 0} 
        maxItineraries={MAX_ITINERARIES} 
      />

      {hasReachedLimit ? (
        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Você atingiu o limite de roteiros gratuitos. Entre em contato conosco para mais informações sobre o plano premium.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/contact">Entrar em Contato</Link>
            </Button>
          </div>
        </div>
      ) : (
        <CreateItineraryForm 
          itineraryCount={profile?.count_itineraries || 0}
          isLoadingCount={isLoading}
          maxItineraries={MAX_ITINERARIES}
        />
      )}
    </div>
  );
};

export default CreateItinerary;