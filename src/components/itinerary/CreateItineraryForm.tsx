import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { InterestsSelect } from "@/components/form/InterestsSelect";

interface CreateItineraryFormProps {
  itineraryCount: number;
  isLoadingCount: boolean;
  maxItineraries: number;
}

export const CreateItineraryForm = ({ 
  itineraryCount, 
  isLoadingCount,
  maxItineraries 
}: CreateItineraryFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(current =>
      current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest]
    );
  };

  const formatDate = (date: Date) => {
    const localDate = new Date(date);
    localDate.setHours(12, 0, 0, 0);
    return localDate.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas de ida e volta");
      return;
    }

    if (itineraryCount >= maxItineraries) {
      toast.error("Você atingiu o limite de roteiros gratuitos");
      return;
    }
    
    setIsLoading(true);

    try {
      const departureDate = formatDate(startDate);
      const returnDate = formatDate(endDate);

      const { data: generatedItinerary, error: generationError } = await supabase.functions.invoke('generate-itinerary', {
        body: {
          destination,
          departureDate,
          returnDate,
          interests: selectedInterests.join(", ")
        }
      });

      if (generationError) throw generationError;

      // Save the itinerary
      const { error: saveError } = await supabase.from('itineraries').insert({
        user_id: user?.id,
        destination,
        departure_date: departureDate,
        return_date: returnDate,
        interests: selectedInterests.join(", "),
        itinerary_data: generatedItinerary
      });

      if (saveError) throw saveError;

      // Increment the count_itineraries in profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ count_itineraries: itineraryCount + 1 })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      toast.success('Roteiro gerado com sucesso!');
      navigate('/itineraries');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao gerar roteiro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="destination">Destino</Label>
        <Input
          id="destination"
          placeholder="Para onde você quer ir?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DatePickerInput
          date={startDate}
          setDate={setStartDate}
          label="Data de Ida"
        />
        <DatePickerInput
          date={endDate}
          setDate={setEndDate}
          label="Data de Volta"
        />
      </div>

      <InterestsSelect
        selectedInterests={selectedInterests}
        toggleInterest={toggleInterest}
      />

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading || itineraryCount >= maxItineraries}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando roteiro...
          </>
        ) : (
          'Gerar Roteiro'
        )}
      </Button>
    </form>
  );
};