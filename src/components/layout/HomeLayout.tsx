import { Link, useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import Navbar from "./Navbar";
import DesktopSidebar from "./DesktopSidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
  user: any | null;
}

const HomeLayout = ({ children, user }: HomeLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white">
      {!user && !isHomePage && <PublicHeader />}

      <div className="flex">
        {user && (
          <div className="hidden lg:block">
            <DesktopSidebar />
          </div>
        )}

        <main className={`flex-1 ${user ? "lg:pl-64" : isHomePage ? "" : "pt-16"}`}>
          <div className="mx-auto">{children}</div>
        </main>
      </div>

      {user && (
        <div className="lg:hidden">
          <Navbar />
        </div>
      )}
    </div>
  );
};

export default HomeLayout;