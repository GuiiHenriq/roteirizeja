import { ReactNode } from "react";
import Navbar from "./Navbar";
import DesktopSidebar from "./DesktopSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <div className="min-h-screen bg-background">
        <ThemeToggle />
        <div className="flex">
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden lg:block">
            <DesktopSidebar />
          </div>
          
          {/* Main Content */}
          <main className="flex-1 pb-24 lg:pb-8 page-transition">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </div>
        
        {/* Mobile Navigation - hidden on desktop */}
        <div className="lg:hidden">
          <Navbar />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;