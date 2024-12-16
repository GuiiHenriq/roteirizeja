import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { InterestsSelect } from "@/components/form/InterestsSelect";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_ITINERARIES = 3;

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryCount, setItineraryCount] = useState<number>(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  useEffect(() => {
    const fetchItineraryCount = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count_itineraries')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setItineraryCount(data?.count_itineraries || 0);
      } catch (error) {
        console.error('Error fetching itinerary count:', error);
        toast.error('Erro ao carregar informações do usuário');
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchItineraryCount();
  }, [user]);

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

    if (itineraryCount >= MAX_ITINERARIES) {
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

  if (isLoadingCount) {
    return <div className="flex justify-center items-center min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Criar Novo Roteiro</h1>
      
      <div className="mb-8">
        <p className="text-muted-foreground">
          Você gerou {itineraryCount} de {MAX_ITINERARIES} roteiros
        </p>
      </div>

      {itineraryCount >= MAX_ITINERARIES ? (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você atingiu o limite de roteiros gratuitos. Entre em contato conosco para mais informações sobre o plano premium.
          </AlertDescription>
        </Alert>
      ) : (
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

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || itineraryCount >= MAX_ITINERARIES}
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
        </Card>
      )}
    </div>
  );
};

export default CreateItinerary;