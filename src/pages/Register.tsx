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

const Register = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordValidation = validatePassword(password);
    
    if (!passwordValidation.isValid) {
      toast.error(`A senha deve conter: ${passwordValidation.errors.join(", ")}`);
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration error:", error);
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
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="password-requirements"
            />
            <p id="password-requirements" className="text-sm text-muted-foreground">
              A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas,
              minúsculas, números e caracteres especiais.
            </p>
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