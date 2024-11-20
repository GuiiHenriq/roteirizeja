import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plane, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { GeneratedItinerary } from "@/types/itinerary";
import ItineraryDisplay from "@/components/itinerary/ItineraryDisplay";
import { useAuth } from "@/contexts/AuthContext";

const interestOptions = [
  { id: "gastronomia", label: "Gastronomia" },
  { id: "praias", label: "Praias" },
  { id: "aventuras", label: "Aventuras" },
  { id: "festas", label: "Festas" },
];

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);

  const saveItinerary = async (itineraryData: GeneratedItinerary) => {
    if (!user) {
      toast.error("Você precisa estar logado para salvar o roteiro");
      return;
    }

    try {
      const { error } = await supabase.from('itineraries').insert({
        user_id: user.id,
        destination: itineraryData.destination,
        departure_date: itineraryData.dates.start,
        return_date: itineraryData.dates.end,
        interests: selectedInterests.join(", "),
        itinerary_data: itineraryData
      });

      if (error) throw error;
      toast.success("Roteiro salvo com sucesso!");
      navigate('/itineraries');
    } catch (error: any) {
      console.error('Erro ao salvar roteiro:', error);
      toast.error("Erro ao salvar o roteiro");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!departureDate || !returnDate) {
        toast.error("Por favor, selecione as datas de ida e volta");
        return;
      }

      if (selectedInterests.length === 0) {
        toast.error("Por favor, selecione pelo menos um interesse");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Por favor, faça login para criar um roteiro");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://vqvgiuabjfozqbgpnlwh.supabase.co/functions/v1/generate-itinerary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            destination,
            departureDate: format(departureDate, "yyyy-MM-dd"),
            returnDate: format(returnDate, "yyyy-MM-dd"),
            interests: selectedInterests.join(", "),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao gerar o roteiro");
      }

      const data = await response.json();
      setGeneratedItinerary(data.itinerary);
      toast.success("Roteiro gerado com sucesso!");
      
    } catch (error) {
      console.error("Erro ao gerar roteiro:", error);
      toast.error("Falha ao gerar o roteiro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Criar Novo Roteiro</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                Destino
              </label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Para onde você quer ir?"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data de Ida</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "PPP", { locale: ptBR }) : "Escolha uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data de Volta</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !returnDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP", { locale: ptBR }) : "Escolha uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium block">
                Interesses
              </label>
              <div className="grid grid-cols-2 gap-4">
                {interestOptions.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={(checked) => {
                        setSelectedInterests(prev =>
                          checked
                            ? [...prev, interest.id]
                            : prev.filter(i => i !== interest.id)
                        );
                      }}
                    />
                    <label
                      htmlFor={interest.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando Roteiro...
                </>
              ) : (
                <>
                  <Plane className="w-4 h-4 mr-2" />
                  Gerar Roteiro
                </>
              )}
            </Button>
          </form>
        </Card>

        {generatedItinerary && (
          <div className="space-y-4">
            <ItineraryDisplay itinerary={generatedItinerary} />
            <Button 
              onClick={() => saveItinerary(generatedItinerary)}
              className="w-full"
              size="lg"
            >
              Salvar Roteiro
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateItinerary;
