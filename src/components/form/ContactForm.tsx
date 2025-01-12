import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { sanitizeInput, checkRateLimit, withTimeout } from "@/middleware/SecurityMiddleware";

const subjects = [
  { value: "reclamacao", label: "Reclamação" },
  { value: "duvida", label: "Dúvida" },
  { value: "sugestao", label: "Sugestão" },
];

export function ContactForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    if (!checkRateLimit(`contact_${user?.id}`, 5, 300000)) { // 5 requests per 5 minutes
      toast.error("Muitas tentativas. Por favor, aguarde alguns minutos.");
      return;
    }

    setIsLoading(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      // Insert contact with timeout
      const contactPromise = supabase
        .from("contacts")
        .insert({
          user_id: user?.id,
          ...sanitizedData,
        })
        .select()
        .single();

      const { data: contactData, error: insertError } = await withTimeout(
        contactPromise,
        5000 // 5 second timeout
      );

      if (insertError) throw insertError;

      // Send email with timeout
      const emailPromise = supabase.functions.invoke("send-contact", {
        body: {
          ...sanitizedData,
          userId: user?.id,
          contactId: contactData.id,
        },
      });

      const { error: emailError } = await withTimeout(
        emailPromise,
        10000 // 10 second timeout
      );

      if (emailError) throw emailError;

      setTicketId(contactData.id);
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Error sending contact:", error);
      toast.error(
        error.message === "Request timed out"
          ? "Tempo limite excedido. Tente novamente."
          : "Erro ao enviar mensagem. Tente novamente mais tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && ticketId) {
    return (
      <div className="max-w-xl mx-auto text-center animate-fade-in">
        <div className="p-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
          <svg
            className="w-16 h-16 mx-auto text-emerald-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
            Mensagem Enviada com Sucesso!
          </h2>
          <p className="text-emerald-600 dark:text-emerald-400 mb-4">
            Seu ticket foi registrado com o número:
          </p>
          <div className="text-3xl font-bold text-emerald-500 mb-6">
            #{ticketId}
          </div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Guardaremos esse número para referência futura.
            <br />
            Em breve entraremos em contato através do e-mail fornecido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          maxLength={255}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Select
          value={formData.subject}
          onValueChange={(value) => setFormData({ ...formData, subject: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um assunto" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.value} value={subject.value}>
                {subject.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="min-h-[150px]"
          required
          maxLength={1000}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
