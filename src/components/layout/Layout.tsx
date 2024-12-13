import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import DesktopSidebar from "./DesktopSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const protectedRoutes = ["/create-itinerary", "/itineraries", "/profile"];
  const publicRoutes = ["/login", "/register"];

  useEffect(() => {
    if (!isLoading) {
      if (
        !user &&
        protectedRoutes.some((route) => location.pathname.startsWith(route))
      ) {
        toast.error("Efetue seu login");
        navigate("/login");
      } else if (user && publicRoutes.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [user, location.pathname, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background">
        {/* Header for logged out users */}
        {!user && (
          <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-b border-border z-50">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
              <Link
                to="/"
                className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
              >
                Viajai
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Entrar
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </header>
        )}

        <div className="flex">
          {/* Desktop Sidebar - only shown when logged in */}
          {user && (
            <div className="hidden lg:block">
              <DesktopSidebar />
            </div>
          )}

          {/* Main Content */}
          <main className={`flex-1 ${user ? "lg:pl-64" : "pt-16"}`}>
            <div className="mx-auto">{children}</div>
          </main>
        </div>

        {/* Mobile Navigation - only shown when logged in */}
        {user && (
          <div className="lg:hidden">
            <Navbar />
          </div>
        )}

        {/* Theme toggle for logged in users */}
        {user && <ThemeToggle className="fixed top-4 right-4 z-50" />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
