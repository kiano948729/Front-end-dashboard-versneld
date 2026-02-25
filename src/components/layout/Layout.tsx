import type { ReactNode } from "react";
import Navbar from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;