import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerInput from "@/components/form/DatePickerInput";
import InterestsSelect from "@/components/form/InterestsSelect";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { supabase } from "@/integrations/supabase/client";

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!destination || !departureDate || !returnDate || interests.length === 0) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      // First, generate the itinerary using our API
      const { data: generatedItinerary } = await api.post("/api/generate-itinerary", {
        destination,
        departureDate,
        returnDate,
        interests: interests.join(", "),
      });

      // Then, save it to Supabase
      const { data: savedItinerary, error } = await supabase
        .from("itineraries")
        .insert({
          user_id: user.id,
          destination,
          departure_date: departureDate.toISOString(),
          return_date: returnDate.toISOString(),
          interests: interests.join(", "),
          itinerary_data: generatedItinerary,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Roteiro criado com sucesso!");
      navigate(`/itineraries/${savedItinerary.id}`);
    } catch (error) {
      console.error("Error creating itinerary:", error);
      toast.error("Erro ao criar roteiro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Roteiro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium mb-2">
                Destino
              </label>
              <Input
                id="destination"
                placeholder="Para onde você quer ir?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DatePickerInput
                label="Data de Ida"
                date={departureDate}
                onSelect={setDepartureDate}
              />
              <DatePickerInput
                label="Data de Volta"
                date={returnDate}
                onSelect={setReturnDate}
              />
            </div>

            <InterestsSelect
              selectedInterests={interests}
              onChange={setInterests}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Gerando roteiro..." : "Gerar Roteiro"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateItinerary;