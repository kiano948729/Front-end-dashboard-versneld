import { Star, TrendingUp, TrendingDown } from "lucide-react";
import type { Character } from "../types/character";
import { Link } from "react-router";

interface AssetCardProps {
  character: Character;
  onToggleFavorite: (id: string) => void;
}

export default function AssetCard({ character, onToggleFavorite }: AssetCardProps) {
  const isPositive = character.powerChange >= 0;

  return (
    <Link to={`/character/${character._id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-[#1E293B] p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#D4AF37]/10 hover:ring-2 hover:ring-[#D4AF37]">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(character._id);
          }}
          className="absolute right-4 top-4 z-10 transition-transform hover:scale-110"
        >
          <Star
            className={`h-5 w-5 ${
              character.isFavorite
                ? "fill-[#D4AF37] text-[#D4AF37]"
                : "text-gray-400 hover:text-[#D4AF37]"
            }`}
          />
        </button>

        <div className="mb-4">
          <h3 className="mb-1 text-xl font-bold text-white">{character.name}</h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-md bg-[#0F172A] px-2 py-1 text-gray-400">
              {character.race}
            </span>
            <span className="text-gray-500">{character.gender}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${character.powerLevel.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-[#22C55E]" />
            ) : (
              <TrendingDown className="h-4 w-4 text-[#EF4444]" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-[#22C55E]" : "text-[#EF4444]"
              }`}
            >
              {isPositive ? "+" : ""}
              {character.powerChange.toFixed(2)}%
            </span>
            <span className="text-xs text-gray-400">24h</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#D4AF37] transition-all group-hover:w-full"></div>
      </div>
    </Link>
  );
}
