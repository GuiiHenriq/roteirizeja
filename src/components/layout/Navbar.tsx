import { Link, useLocation } from "react-router-dom";
import { Home, Map, Calendar, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/itineraries") {
      return location.pathname === "/itineraries" || location.pathname.startsWith("/itineraries/");
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4 z-50 lg:hidden">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          <Home className="w-6 h-6" />
        </Link>
        <Link to="/create-itinerary" className={`nav-link ${isActive("/create-itinerary") ? "active" : ""}`}>
          <Map className="w-6 h-6" />
        </Link>
        <Link to="/itineraries" className={`nav-link ${isActive("/itineraries") ? "active" : ""}`}>
          <Calendar className="w-6 h-6" />
        </Link>
        <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}>
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;