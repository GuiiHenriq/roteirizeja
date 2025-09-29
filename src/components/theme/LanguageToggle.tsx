import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { i18n, t } = useTranslation();

  const isPT = i18n.language === "pt-BR";

  const toggleLanguage = () => {
    const next = isPT ? "en-US" : "pt-BR";
    void i18n.changeLanguage(next);
  };

  const label = isPT ? t("language.enUS") : t("language.ptBR");

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className={className}>
      <Globe className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}

export default LanguageToggle;


