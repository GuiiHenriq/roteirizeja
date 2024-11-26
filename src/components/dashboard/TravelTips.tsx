import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Umbrella, CreditCard, Map, Shield, Globe } from "lucide-react";

const tips = [
  {
    icon: Plane,
    title: "Reservas Antecipadas",
    description: "Reserve suas passagens com antecedência para melhores preços",
  },
  {
    icon: Umbrella,
    title: "Clima Local",
    description: "Verifique a previsão do tempo antes de fazer as malas",
  },
  {
    icon: CreditCard,
    title: "Orçamento",
    description: "Planeje seus gastos e tenha uma reserva de emergência",
  },
  {
    icon: Map,
    title: "Roteiro Flexível",
    description: "Deixe espaço para mudanças e descobertas espontâneas",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Contrate um seguro viagem e mantenha documentos seguros",
  },
  {
    icon: Globe,
    title: "Cultura Local",
    description: "Pesquise sobre costumes e tradições do seu destino",
  },
];

export const TravelTips = () => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Dicas de Viagem</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip) => (
          <Card key={tip.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <tip.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};