import { Star } from "lucide-react";

interface NavbarProps {
  favoriteCount: number;
}

export default function Navbar({ favoriteCount }: NavbarProps) {
  return (
    <nav className="border-b border-[#1E293B] bg-[#0F172A]">
      <div className="mx-auto max-w-350 px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#D4AF37]">LOTR MARKET</h1>
            <p className="text-xs text-gray-400">Middle-earth Financial Overview</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#1E293B] px-4 py-2">
            <Star className="h-4 w-4 text-[#D4AF37]" fill="#D4AF37" />
            <span className="text-sm font-medium text-white">{favoriteCount}</span>
            <span className="text-xs text-gray-400">Favorites</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
