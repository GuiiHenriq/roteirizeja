import { Link, useLocation } from "react-router-dom";
import { Home, Map, Calendar, Heart, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const DesktopSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create-itinerary", icon: Map, label: "Criar Roteiro" },
    { path: "/itineraries", icon: Calendar, label: "Meus Roteiros" },
    { path: "/saved", icon: Heart, label: "Favoritos" },
    { path: "/profile", icon: Settings, label: "Configurações" },
  ];

  return (
    <aside className="w-64 h-screen bg-card fixed left-0 top-0 border-r border-border p-6 z-50">
      <div className="flex flex-col h-full">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Viajai</h1>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-primary/5 text-foreground/80 hover:text-foreground"
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;