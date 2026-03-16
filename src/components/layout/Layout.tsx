import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <main className="w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;