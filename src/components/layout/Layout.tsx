import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24 page-transition">{children}</main>
      <Navbar />
    </div>
  );
};

export default Layout;