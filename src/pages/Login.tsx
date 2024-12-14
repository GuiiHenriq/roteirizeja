import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 glass-card p-8 animate-fadeIn">
        <div className="text-center animate-slideDown">
          <h2 className="text-3xl font-bold">Bem-vindo de Volta</h2>
          <p className="text-muted-foreground mt-2">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 animate-slideUp" style={{ animationDelay: "200ms" }}>
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
              disabled={loading}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          <div className="space-y-2 animate-slideUp" style={{ animationDelay: "400ms" }}>
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              disabled={loading}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full animate-slideUp hover:scale-[1.02] transition-transform" 
            style={{ animationDelay: "600ms" }}
            size="lg" 
            disabled={loading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="text-center text-sm animate-fadeIn" style={{ animationDelay: "800ms" }}>
          Não tem uma conta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;