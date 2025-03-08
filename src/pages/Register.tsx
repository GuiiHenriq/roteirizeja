import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UserPlus, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Register = () => {
  const { signUp, resendConfirmationEmail } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    const errors = [];
    if (!hasUpperCase) errors.push("uma letra maiúscula");
    if (!hasLowerCase) errors.push("uma letra minúscula");
    if (!hasNumbers) errors.push("um número");
    if (!hasSpecialChar) errors.push("um caractere especial");
    if (!hasMinLength) errors.push("mínimo de 8 caracteres");

    return {
      isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && hasMinLength,
      errors
    };
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido";
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = `A senha deve conter: ${passwordValidation.errors.join(", ")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      setIsRegistered(true);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error("Erro ao criar conta. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResendingEmail(true);
    try {
      await resendConfirmationEmail(email);
    } finally {
      setIsResendingEmail(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="container max-w-lg mx-auto p-4">
        <Card className="p-8 border-2 border-emerald-500 shadow-lg">
          <div className="text-center space-y-6">
            <div className="bg-emerald-100 p-4 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-emerald-700">
              Cadastro realizado com sucesso!
            </h1>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
              <h2 className="font-bold text-lg text-yellow-700">ATENÇÃO: Confirmação necessária</h2>
              <p className="text-gray-700 mt-2">
                Enviamos um e-mail de confirmação para <strong className="text-black">{email}</strong>.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Você precisa confirmar seu e-mail antes de fazer login.</strong> Sem esta confirmação, 
                não será possível acessar sua conta.
              </p>
            </div>
            
            <div className="space-y-4 text-left">
              <h3 className="font-semibold text-lg">Próximos passos:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Abra seu e-mail</li>
                <li>Procure por um e-mail de "Roteirize Já"</li>
                <li>Clique no botão ou link de confirmação no e-mail</li>
                <li>Após confirmar, você poderá fazer login na plataforma</li>
              </ol>
            </div>
            
            <Alert className="bg-blue-50 border border-blue-200">
              <AlertDescription className="text-blue-700">
                <strong>Dica:</strong> Não se esqueça de verificar também sua caixa de spam ou promoções 
                caso não encontre o e-mail na caixa de entrada.
              </AlertDescription>
            </Alert>
            
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="border-emerald-500 text-emerald-700 hover:bg-emerald-50 w-full"
                onClick={() => window.location.href = `mailto:${email}`}
              >
                <Mail className="mr-2 h-4 w-4" />
                Abrir meu e-mail
              </Button>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-700 hover:bg-blue-50 w-full"
                onClick={handleResendEmail}
                disabled={isResendingEmail}
              >
                {isResendingEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Reenviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Reenviar e-mail
                  </>
                )}
              </Button>
              <Link to="/login" className="w-full">
                <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                  Ir para o Login
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 glass-card p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Criar sua Conta</h2>
          <p className="text-muted-foreground mt-2">Registre-se agora mesmo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: "" });
                }
              }}
              className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
              aria-invalid={!!errors.name}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
              aria-invalid={!!errors.email}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
              className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
              aria-invalid={!!errors.password}
              aria-describedby="password-requirements"
              required
            />
            <p id="password-requirements" className="text-sm text-muted-foreground">
              A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas,
              minúsculas, números e caracteres especiais.
            </p>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <UserPlus className="w-4 h-4 mr-2" />
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entre
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;