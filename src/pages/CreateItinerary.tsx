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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ItineraryDisplay from "@/components/itinerary/ItineraryDisplay";
import { GeneratedItinerary, isJsonSerializable } from "@/types/itinerary";
import type { Json } from "@/integrations/supabase/types";

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(current =>
      current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-CA');
  };

  const handleSaveItinerary = async () => {
    if (!generatedItinerary || !isJsonSerializable(generatedItinerary)) {
      toast.error('Erro: Dados do roteiro inválidos');
      return;
    }

    try {
      const departureDate = formatDate(startDate!);
      const returnDate = formatDate(endDate!);

      const { error: saveError } = await supabase.from('itineraries').insert({
        user_id: user?.id,
        destination,
        departure_date: departureDate,
        return_date: returnDate,
        interests: selectedInterests.join(", "),
        itinerary_data: generatedItinerary as Json
      });

      if (saveError) throw saveError;

      toast.success('Roteiro salvo com sucesso!');
      navigate('/itineraries');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao salvar roteiro. Por favor, tente novamente.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas de ida e volta");
      return;
    }
    
    setIsLoading(true);

    try {
      const departureDate = formatDate(startDate);
      const returnDate = formatDate(endDate);

      const { data: itineraryData, error: generationError } = await supabase.functions.invoke('generate-itinerary', {
        body: {
          destination,
          departureDate,
          returnDate,
          interests: selectedInterests.join(", ")
        }
      });

      if (generationError) throw generationError;

      setGeneratedItinerary(itineraryData);
      setShowPreview(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao gerar roteiro. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    setShowConfirmation(false);
    setGeneratedItinerary(null);
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

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview do Roteiro</DialogTitle>
            <DialogDescription>
              Revise seu roteiro gerado antes de salvar
            </DialogDescription>
          </DialogHeader>
          
          {generatedItinerary && (
            <div className="py-4">
              <ItineraryDisplay itinerary={generatedItinerary} />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => handleCancel()}>
              Cancelar
            </Button>
            <Button onClick={() => setShowConfirmation(true)}>
              Salvar Roteiro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Salvar Roteiro</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja salvar este roteiro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveItinerary}>
              Salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateItinerary;
