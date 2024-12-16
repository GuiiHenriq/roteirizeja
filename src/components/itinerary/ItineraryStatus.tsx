import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ItineraryStatusProps {
  itineraryCount: number;
  maxItineraries: number;
}

export const ItineraryStatus = ({ itineraryCount, maxItineraries }: ItineraryStatusProps) => {
  const hasReachedLimit = itineraryCount >= maxItineraries;

  return (
    <div className="mb-6 lg:mb-8">
      <p className="text-muted-foreground text-center lg:text-left text-sm lg:text-base">
        Você gerou {itineraryCount} de {maxItineraries} roteiros
      </p>

      {hasReachedLimit && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Você atingiu o limite de roteiros gratuitos. Entre em contato conosco para mais informações sobre o plano premium.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};