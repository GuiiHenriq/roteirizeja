import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";
import HomeLayout from "./HomeLayout";
import AppLayout from "./AppLayout";

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
    return <HomeLayout user={user}>{children}</HomeLayout>;
  }

  // Para todas as outras páginas, mantemos o ThemeProvider
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <AppLayout user={user}>{children}</AppLayout>
    </ThemeProvider>
  );
};

export default Layout;