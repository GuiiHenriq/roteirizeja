import { Link, useLocation } from "react-router-dom";
import { Home, Map, Calendar, Heart, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border p-4 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          <Home className="w-6 h-6" />
        </Link>
        <Link to="/explore" className={`nav-link ${isActive("/explore") ? "active" : ""}`}>
          <Map className="w-6 h-6" />
        </Link>
        <Link to="/itineraries" className={`nav-link ${isActive("/itineraries") ? "active" : ""}`}>
          <Calendar className="w-6 h-6" />
        </Link>
        <Link to="/saved" className={`nav-link ${isActive("/saved") ? "active" : ""}`}>
          <Heart className="w-6 h-6" />
        </Link>
        <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}>
          <Settings className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;