import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Map, Calendar, Settings, Contact, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    if (path === "/itineraries") {
      return location.pathname === "/itineraries" || location.pathname.startsWith("/itineraries/");
    }
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Sessão encerrada com sucesso");
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao sair da sessão");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4 z-50 lg:hidden">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 text-sm ${
            isActive("/") ? "text-primary" : "text-foreground/60"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Início</span>
        </Link>
        
        <Link 
          to="/create-itinerary" 
          className={`flex flex-col items-center gap-1 text-sm ${
            isActive("/create-itinerary") ? "text-primary" : "text-foreground/60"
          }`}
        >
          <Map className="w-5 h-5" />
          <span>Criar</span>
        </Link>
        
        <Link 
          to="/itineraries" 
          className={`flex flex-col items-center gap-1 text-sm ${
            isActive("/itineraries") ? "text-primary" : "text-foreground/60"
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Roteiros</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 text-sm ${
            isActive("/profile") ? "text-primary" : "text-foreground/60"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Config</span>
        </Link>
        
        <Link 
          to="/contact" 
          className={`flex flex-col items-center gap-1 text-sm ${
            isActive("/contact") ? "text-primary" : "text-foreground/60"
          }`}
        >
          <Contact className="w-5 h-5" />
          <span>Contato</span>
        </Link>

        <button
          onClick={handleSignOut}
          className="flex flex-col items-center gap-1 text-sm text-foreground/60"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;