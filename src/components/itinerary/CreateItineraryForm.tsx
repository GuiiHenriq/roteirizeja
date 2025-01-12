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
import { sanitizeInput, checkRateLimit, withTimeout } from "@/middleware/SecurityMiddleware";

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
    const sanitizedInterest = sanitizeInput(interest);
    setSelectedInterests(current =>
      current.includes(sanitizedInterest)
        ? current.filter(i => i !== sanitizedInterest)
        : [...current, sanitizedInterest]
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

    // Rate limiting check
    if (!checkRateLimit(`create_itinerary_${user?.id}`, 3, 300000)) { // 3 requests per 5 minutes
      toast.error("Muitas tentativas. Por favor, aguarde alguns minutos.");
      return;
    }
    
    setIsLoading(true);

    try {
      const departureDate = formatDate(startDate);
      const returnDate = formatDate(endDate);
      const sanitizedDestination = sanitizeInput(destination);

      // Generate itinerary with timeout
      const generationPromise = supabase.functions.invoke('generate-itinerary', {
        body: {
          destination: sanitizedDestination,
          departureDate,
          returnDate,
          interests: selectedInterests.map(sanitizeInput).join(", ")
        }
      });

      const { data: generatedItinerary, error: generationError } = await withTimeout(
        generationPromise,
        30000 // 30 second timeout for AI generation
      );

      if (generationError) throw generationError;

      // Save the itinerary with timeout
      const savePromise = supabase.from('itineraries').insert({
        user_id: user?.id,
        destination: sanitizedDestination,
        departure_date: departureDate,
        return_date: returnDate,
        interests: selectedInterests.map(sanitizeInput).join(", "),
        itinerary_data: generatedItinerary
      });

      const { error: saveError } = await withTimeout(
        savePromise,
        5000 // 5 second timeout
      );

      if (saveError) throw saveError;

      // Increment count with timeout
      const updatePromise = supabase
        .from('profiles')
        .update({ count_itineraries: itineraryCount + 1 })
        .eq('id', user?.id);

      const { error: updateError } = await withTimeout(
        updatePromise,
        5000 // 5 second timeout
      );

      if (updateError) throw updateError;

      toast.success('Roteiro gerado com sucesso!');
      navigate('/itineraries');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(
        error.message === "Request timed out"
          ? "Tempo limite excedido. Tente novamente."
          : "Erro ao gerar roteiro. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="destination" className="text-base">Destino</Label>
        <Input
          id="destination"
          placeholder="Para onde você quer ir?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="h-12 text-base"
          maxLength={100}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        className="w-full h-12 text-base font-semibold mt-8" 
        disabled={isLoading || itineraryCount >= maxItineraries}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando roteiro...
          </>
        ) : (
          'Gerar Roteiro'
        )}
      </Button>
    </form>
  );
};
