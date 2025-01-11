import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import AppLayout from "./AppLayout";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Remove dark mode class when on home page
  useEffect(() => {
    const root = window.document.documentElement;
    if (location.pathname === "/") {
      root.classList.remove("dark");
    }
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se estamos na página inicial, não usamos o ThemeProvider e forçamos o light mode
  if (location.pathname === "/") {
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }

  // Para todas as outras páginas, mantemos o ThemeProvider
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <AppLayout user={user}>{children}</AppLayout>
    </ThemeProvider>
  );
};

export default Layout;