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

const subjects = [
  { value: "reclamacao", label: "Reclamação" },
  { value: "duvida", label: "Dúvida" },
  { value: "sugestao", label: "Sugestão" },
];

export function ContactForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, insert the contact in the database
      const { data: contactData, error: insertError } = await supabase
        .from("contacts")
        .insert({
          user_id: user?.id,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Then send the email with the contact ID
      const { error: emailError } = await supabase.functions.invoke("send-contact", {
        body: {
          ...formData,
          userId: user?.id,
          contactId: contactData.id,
        },
      });

      if (emailError) throw emailError;

      toast.success(`Mensagem enviada com sucesso! ID do contato: ${contactData.id}`);
      setFormData({ ...formData, subject: "", message: "" });
    } catch (error: any) {
      console.error("Error sending contact:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
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
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}