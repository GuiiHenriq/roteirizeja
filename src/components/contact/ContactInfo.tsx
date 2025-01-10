import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ContactInfo = () => {
  return (
    <Card className="p-6 mb-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Contato</h2>
      </div>
      <p className="text-muted-foreground">
        Caso prefira, você também pode nos enviar um e-mail diretamente para:
      </p>
      <a
        href="mailto:contato@roteirizeja.com.br"
        className="text-primary hover:text-primary/80 font-medium mt-2 inline-block transition-colors"
      >
        contato@roteirizeja.com.br
      </a>
    </Card>
  );
};
