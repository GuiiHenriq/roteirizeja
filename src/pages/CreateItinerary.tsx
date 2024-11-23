import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { InterestsSelect } from "@/components/form/InterestsSelect";

const CreateItinerary = () => {
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

  const formatDateToUTC = (date: Date) => {
    // Ajusta para o fuso horário de Brasília (UTC-3)
    const brasiliaOffset = -3;
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12 + brasiliaOffset, // Ajustando para meio-dia UTC-3
      0,
      0,
      0
    )).toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas de ida e volta");
      return;
    }
    
    setIsLoading(true);

    try {
      // Formatando as datas corretamente para UTC-3
      const departureDate = formatDateToUTC(startDate);
      const returnDate = formatDateToUTC(endDate);

      // First, generate the itinerary using the OpenAI function
      const { data: generatedItinerary, error: generationError } = await supabase.functions.invoke('generate-itinerary', {
        body: {
          destination,
          departureDate,
          returnDate,
          interests: selectedInterests.join(", ")
        }
      });

      if (generationError) throw generationError;

      // Then, save the itinerary to the database
      const { error: saveError } = await supabase.from('itineraries').insert({
        user_id: user?.id,
        destination,
        departure_date: departureDate,
        return_date: returnDate,
        interests: selectedInterests.join(", "),
        itinerary_data: generatedItinerary
      });

      if (saveError) throw saveError;

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Roteiro</h1>
      <Card className="p-6">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
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
      </Card>
    </div>
  );
};

export default CreateItinerary;