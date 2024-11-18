import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plane, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { GeneratedItinerary } from "@/types/itinerary";
import ItineraryDisplay from "@/components/itinerary/ItineraryDisplay";

const CreateItinerary = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!departureDate || !returnDate) {
        toast.error("Por favor, selecione as datas de ida e volta");
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
            interests,
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

            <div className="space-y-2">
              <label htmlFor="interests" className="text-sm font-medium">
                Interesses
              </label>
              <Textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Quais são seus interesses? (ex: cultura, gastronomia, aventura)"
                className="min-h-[100px]"
                required
              />
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
          <ItineraryDisplay itinerary={generatedItinerary} />
        )}
      </div>
    </div>
  );
};

export default CreateItinerary;