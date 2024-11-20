import { ReactNode } from "react";
import Navbar from "./Navbar";
import DesktopSidebar from "./DesktopSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background">
        <ThemeToggle className="fixed top-4 right-4 z-50" />
        
        {/* Header for logged out users */}
        {!user && (
          <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-b border-border z-50">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
                Viajai
              </Link>
              <Link 
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Entrar
              </Link>
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
          <main className={`flex-1 ${user ? 'lg:pl-64' : 'pt-16'}`}>
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </div>
        
        {/* Mobile Navigation - only shown when logged in */}
        {user && (
          <div className="lg:hidden">
            <Navbar />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Layout;