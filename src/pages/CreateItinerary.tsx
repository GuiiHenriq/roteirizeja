import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateItineraryForm } from "@/components/itinerary/CreateItineraryForm";
import { ItineraryStatus } from "@/components/itinerary/ItineraryStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_ITINERARIES = 3;

const CreateItinerary = () => {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("count_itineraries")
        .eq("id", user?.id)
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

  const PremiumPlanCard = () => (
    <Card className="mt-6 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center text-emerald-800 dark:text-emerald-400">
          Plano Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground mb-6">
          Desbloqueie recursos exclusivos e crie roteiros ilimitados
        </p>
        <ul className="space-y-3">
          {[
            "Roteiros ilimitados",
            "Personalização avançada",
            "Suporte prioritário",
            "Exportação em PDF",
            "Compartilhamento com amigos",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 pt-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            R$ 19,90
          </span>
          <span className="text-sm text-muted-foreground">/mês</span>
        </div>
        <Button className="w-full disabled">Em Breve</Button>
      </CardFooter>
    </Card>
  );

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
              Ops! Você já criou todos os seus 3 roteiros gratuitos. Quer
              continuar explorando o mundo? Assine nosso plano Premium e
              desbloqueie roteiros ilimitados!
            </AlertDescription>
          </Alert>
          <PremiumPlanCard />
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
