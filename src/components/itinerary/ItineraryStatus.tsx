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
    </div>
  );
};