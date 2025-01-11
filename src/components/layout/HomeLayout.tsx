import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
  user: any | null;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default HomeLayout;