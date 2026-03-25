import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <main className="w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;