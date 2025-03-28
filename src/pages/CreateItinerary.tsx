import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CreateItineraryForm } from "@/components/itinerary/CreateItineraryForm";
import { ItineraryStatus } from "@/components/itinerary/ItineraryStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutButton } from "@/components/CheckoutButton";
import { useEffect, useState } from "react";

const ITINERARIES_FREE = parseInt(import.meta.env.VITE_ITINERARIES_FREE);
const ITINERARIES_PAID = parseInt(import.meta.env.VITE_ITINERARIES_PAID);

const CreateItinerary = () => {
  const { user } = useAuth();
  const [hasApprovedPayment, setHasApprovedPayment] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("count_itineraries, is_subscribe")
        .eq("id", user?.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (!user) return;

    const checkPaymentStatus = async () => {
      setIsCheckingPayment(true);
      setPaymentError(null);
      
      try {
        const { data: orders, error } = await supabase
          .from("orders")
          .select("status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);
        
        if (error) {
          console.error("Erro ao verificar pagamento:", error);
          setPaymentError("Não foi possível verificar seu status de pagamento.");
          return;
        }
        
        if (orders && orders.length > 0) {
          const latestOrder = orders[0];
          setPaymentStatus(latestOrder.status);
          setHasApprovedPayment(latestOrder.status === "approved" || latestOrder.status !== null)
          
          if (latestOrder.status !== "approved" || latestOrder.status === null) {
            console.log(`Pagamento encontrado com status: ${latestOrder.status}`);
          } else {
            console.log("Pagamento aprovado encontrado!");
          }
        } else {
          console.log("Nenhum pagamento encontrado para este usuário.");
        }
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err);
        setPaymentError("Ocorreu um erro ao verificar seu status de pagamento.");
      } finally {
        setIsCheckingPayment(false);
      }
    };
    
    checkPaymentStatus();
  }, [user]);

  if (isLoading || isCheckingPayment) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const MAX_ITINERARIES = profile?.is_subscribe ? ITINERARIES_PAID : ITINERARIES_FREE;

  const hasReachedLimit = (profile?.count_itineraries || 0) >= MAX_ITINERARIES;

  const hasPendingPayment = paymentStatus && (paymentStatus !== "approved" || paymentStatus === null);

  const PremiumPlanCard = () => (
    <Card className="mt-6 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center text-emerald-800 dark:text-emerald-400">
          Plano Premium
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground mb-6">
          Desbloqueie recursos exclusivos e crie roteiros ilimitados
        </p>
        <ul className="space-y-3">
          {[
            "Roteiros ilimitados",
            "Personalização avançada",
            "Suporte prioritário",
            "Exportação em PDF",
            "Compartilhamento com amigos",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 pt-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            R$ 19,90
          </span>
          <span className="text-sm text-muted-foreground">/mês</span>
        </div>
        <Button className="w-full" disabled>
          Em Breve
        </Button>
      </CardFooter>
    </Card>
  );

  const BasicPlanCard = () => (
    <Card className="mt-6 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 relative">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center text-blue-800 dark:text-blue-400">
          Plano Básico
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground mb-6">
          Compra única para criar até {ITINERARIES_PAID} roteiros com recursos exclusivos
        </p>
        <ul className="space-y-3">
          {[
            `Criar até ${ITINERARIES_PAID} roteiros`,
            "Suporte prioritário",
            "Exportar em PDF",
            "Editar qualquer detalhe do roteiro",
            "Compartilhar com os amigos",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4 pt-6">
        <div className="text-center">
          <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            R$ 9,90
          </span>
          <span className="text-sm text-muted-foreground">
            {" "}
            (pagamento único)
          </span>
        </div>
        <CheckoutButton />
      </CardFooter>
    </Card>
  );

  return (
    <div className="px-4 py-6 lg:py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center lg:text-left">
        Criar Novo Roteiro
      </h1>

      <ItineraryStatus
        itineraryCount={profile?.count_itineraries || 0}
        maxItineraries={MAX_ITINERARIES}
      />

      {paymentError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      {hasPendingPayment && (
        <Alert className="mb-4">
          <Info className="h-4 w-4" />
          {paymentStatus === "cancelled" &&
            <AlertDescription>
              Você tem um pedido que não foi encontrado o pagamento.
              <br />Caso tenha efetuado o pagamento, entre em contato conosco! 
            </AlertDescription>
          }
          {paymentStatus === "pending" &&
            <AlertDescription>
              Você tem um pagamento pendente. Aguarde a confirmação do pagamento para continuar criando roteiros.
              <br />Caso tenha efetuado o pagamento, entre em contato conosco! 
            </AlertDescription>
          }
        </Alert>
      )}

      {hasReachedLimit ? (
        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {profile?.is_subscribe
                ? `Ops! Você já criou todos os seus ${ITINERARIES_PAID} roteiros. Assine o plano Básico novamente para liberar mais ${ITINERARIES_PAID} roteiros!`
                : `Ops! Você já criou o seu roteiro gratuito. Quer continuar explorando o mundo? Escolha um de nossos planos abaixo!`}
            </AlertDescription>
          </Alert>
          <div className="grid gap-6 md:grid-cols-2">
            <BasicPlanCard />
            <PremiumPlanCard />
          </div>
        </div>
      ) : (
        <CreateItineraryForm
          itineraryCount={profile?.count_itineraries || 0}
          isLoadingCount={isLoading}
          maxItineraries={MAX_ITINERARIES}
        />
      )}
    </div>
  );
};

export default CreateItinerary;
