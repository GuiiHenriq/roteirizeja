import { useState, useEffect } from "react";
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
import { sanitizeInput, checkRateLimit } from "@/utils/validation";
import { withTimeout } from "@/middleware/SecurityMiddleware";
import { initCSRFProtection, addCSRFToken } from "@/utils/security";

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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Inicializa proteção CSRF quando o componente é montado
  useEffect(() => {
    initCSRFProtection();
  }, []);

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

  // Função para validar o período entre as datas
  const validateDateRange = (start: Date, end: Date) => {
    const maxDays = 30; // Máximo de 30 dias de viagem
    const tripDuration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (tripDuration > maxDays) {
      toast.error(`A duração máxima da viagem é de ${maxDays} dias`);
      return false;
    }
    
    return true;
  };

  // Função para validar se a data de início é válida
  const validateStartDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) {
      toast.error("A data de ida não pode ser no passado");
      return false;
    }
    
    return true;
  };

  // Função para validar se a data de retorno é válida
  const validateEndDate = (start: Date, end: Date) => {
    if (end < start) {
      toast.error("A data de volta deve ser posterior à data de ida");
      return false;
    }
    
    return validateDateRange(start, end);
  };

  // Atualiza a função de alteração da data de retorno para incluir a validação
  const handleEndDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    if (validateEndDate(startDate, date)) {
      setEndDate(date);
    }
  };
  
  // Atualiza a função de alteração da data de início para ajustar a data de retorno se necessário
  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    if (validateStartDate(date)) {
      setStartDate(date);
      
      // Se a nova data de início tornar o período inválido, ajusta a data de retorno
      if (!validateDateRange(date, endDate)) {
        // Ajusta a data de retorno para o máximo permitido
        const maxEndDate = new Date(date);
        maxEndDate.setDate(date.getDate() + 30);
        setEndDate(maxEndDate);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica do lado do cliente
    if (!destination.trim()) {
      toast.error("Por favor, informe o destino da viagem");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas de ida e volta");
      return;
    }

    // Validação de datas usando as funções de validação
    if (!validateStartDate(startDate) || !validateEndDate(startDate, endDate)) {
      return;
    }

    if (itineraryCount >= maxItineraries) {
      toast.error("Você atingiu o limite de roteiros gratuitos");
      return;
    }

    // Rate limiting check
    if (!checkRateLimit(`create_itinerary_${user?.id || 'anonymous'}`, 3, 300000)) { // 3 requests per 5 minutes
      toast.error("Muitas tentativas. Por favor, aguarde alguns minutos.");
      return;
    }
    
    setIsLoading(true);

    try {
      const departureDate = formatDate(startDate);
      const returnDate = formatDate(endDate);
      const sanitizedDestination = sanitizeInput(destination);

      // Prepara dados com proteção CSRF para o frontend
      const secureData = addCSRFToken({
        destination: sanitizedDestination,
        departureDate,
        returnDate,
        interests: selectedInterests.map(sanitizeInput).join(", ")
      });

      // Dados para enviar para a API (sem o token CSRF)
      const apiData = {
        destination: sanitizedDestination,
        departureDate,
        returnDate,
        interests: selectedInterests.map(sanitizeInput).join(", "),
        userId: user?.id // Adicionando o userId para a função Edge Function
      };

      // Generate itinerary with timeout
      const generationPromise = supabase.functions.invoke('generate-itinerary', {
        body: apiData // Enviamos os dados sem o token CSRF
      });

      const { data: generatedItinerary, error: generationError } = await withTimeout(
        generationPromise,
        30000 // 30 second timeout for AI generation
      );

      if (generationError) throw generationError;

      // Usar a função RPC save_itinerary para salvar o roteiro e atualizar o contador
      // @ts-ignore - Ignorando erros de tipagem para a chamada RPC
      const rpcResult = await supabase.rpc('save_itinerary', {
        p_user_id: user?.id,
        p_destination: sanitizedDestination,
        p_departure_date: departureDate,
        p_return_date: returnDate,
        p_interests: selectedInterests.map(sanitizeInput).join(", "),
        p_itinerary_data: generatedItinerary
      });

      if (rpcResult.error) {
        throw rpcResult.error;
      }
      
      // Verificar se temos dados e se a operação foi bem-sucedida
      const resultData = rpcResult.data as any || {};
      if (!resultData.success) {
        throw new Error(resultData.error || 'Erro ao salvar roteiro');
      }

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
          setDate={handleStartDateChange}
          label="Data de Ida"
        />
        <DatePickerInput
          date={endDate}
          setDate={handleEndDateChange}
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
