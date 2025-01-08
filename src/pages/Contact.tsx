import { ContactForm } from "@/components/form/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function Contact() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Entre em Contato</h1>
        <p className="text-muted-foreground text-center mb-8">
          Tem alguma dúvida, sugestão ou reclamação? Preencha o formulário abaixo
          ou entre em contato por e-mail.
        </p>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}