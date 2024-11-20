import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Map, Calendar, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DesktopSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/create-itinerary", icon: Map, label: "Criar Roteiro" },
    { path: "/itineraries", icon: Calendar, label: "Meus Roteiros" },
    { path: "/profile", icon: Settings, label: "Configurações" },
  ];

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
    <aside className="w-64 h-screen bg-card fixed left-0 top-0 border-r border-border p-6 z-50">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            Viajai
          </Link>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5 text-foreground/80 hover:text-foreground"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          className="w-full justify-start space-x-3"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;