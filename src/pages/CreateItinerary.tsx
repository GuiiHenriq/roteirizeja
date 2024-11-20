import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ItineraryData {
  dates: {
    start: string;
    end: string;
  };
}

const generateItinerary = async ({ destination, dates, interests }: {
  destination: string;
  dates: { start: string; end: string };
  interests: string[];
}) => {
  // Simulate API call
  return {
    data: {
      dates: dates,
      // Add other itinerary data as needed
    },
    error: null
  };
};

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const interests = [
    "Museus",
    "Gastronomia",
    "Praias",
    "Natureza",
    "História",
    "Compras",
    "Vida Noturna",
    "Aventura",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: itineraryData, error: generationError } = await generateItinerary({
        destination,
        dates: {
          start: startDate?.toISOString().split('T')[0] || '',
          end: endDate?.toISOString().split('T')[0] || ''
        },
        interests: selectedInterests
      });

      if (generationError) throw generationError;

      const { error } = await supabase.from('itineraries').insert({
        user_id: user?.id,
        destination,
        departure_date: itineraryData.dates.start,
        return_date: itineraryData.dates.end,
        interests: selectedInterests.join(", "),
        itinerary_data: JSON.stringify(itineraryData)
      });

      if (error) throw error;

      toast.success('Roteiro gerado com sucesso!');
      navigate('/itineraries');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao gerar roteiro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(current =>
      current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest]
    );
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
            <div className="space-y-2">
              <Label>Data de Ida</Label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Volta</Label>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interesses</Label>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={() => toggleInterest(interest)}
                  />
                  <label
                    htmlFor={interest}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>

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