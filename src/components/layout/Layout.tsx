import { ReactNode } from "react";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background">
        <ThemeToggle />
        <main className="pb-24 page-transition">{children}</main>
        <Navbar />
      </div>
    </ThemeProvider>
  );
};

export default Layout;