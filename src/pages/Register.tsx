import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Register = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
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

  if (isRegistered) {
    return (
      <div className="container max-w-lg mx-auto p-4">
        <Card className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">
              Cadastro realizado com sucesso!
            </h1>
            <p className="text-gray-600">
              Enviamos um e-mail de confirmação para <strong>{email}</strong>.
              Por favor, verifique sua caixa de entrada e clique no link de
              confirmação para ativar sua conta.
            </p>
            <Alert>
              <AlertDescription>
                Não se esqueça de verificar também sua caixa de spam caso não
                encontre o e-mail.
              </AlertDescription>
            </Alert>
            <Link to="/login">
              <Button className="mt-4">Voltar para o Login</Button>
            </Link>
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