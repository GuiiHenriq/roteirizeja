import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Plane } from "lucide-react";
import Navbar from "./Navbar";
import DesktopSidebar from "./DesktopSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  user: any | null;
}

const AppLayout = ({ children, user }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {!user && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-lg border-b border-border z-50">
          <div className="container mx-auto h-full px-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
            >
              <Plane className="h-8 w-8" />
              <span className="text-2xl font-montserrat font-bold">
                Roteirize Já
              </span>
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
        {user && (
          <div className="hidden lg:block">
            <DesktopSidebar />
          </div>
        )}

        <main className={`flex-1 ${user ? "lg:pl-64" : "pt-16"}`}>
          <div className="mx-auto">{children}</div>
        </main>
      </div>

      {user && (
        <div className="lg:hidden">
          <Navbar />
        </div>
      )}

      {user && <ThemeToggle className="fixed top-4 right-4 z-50" />}
    </div>
  );
};

export default AppLayout;