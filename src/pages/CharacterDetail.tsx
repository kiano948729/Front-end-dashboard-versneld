import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import type { ApiCharacter, Character } from "../types/character";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mapApiCharacterToCharacter } from "../utils/characterMapper";

export default function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true);
      setError("");
      try {
        if (!id) return;

        const response = await api.get<{ docs: ApiCharacter[] }>(
          `/character/${id}`,
        );
        const data = response.data.docs;

        if (data.length === 0) {
          setError("Character not found");
          return;
        }

        const mappedCharacter = mapApiCharacterToCharacter(data[0]);
        setCharacter(mappedCharacter);
        setIsFavorite(mappedCharacter.isFavorite);
      } catch (err: any) {
        console.error("Failed to fetch character:", err);
        setError("Failed to load character");
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
        Loading...
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-red-500">
        {error || "Character not found"}
      </div>
    );
  }

  const isPositive = character.powerChange >= 0;

  const priceHistory = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: character.powerLevel + (Math.random() - 0.5) * 2000,
  }));

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="border-b border-[#1E293B]">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-[#1E293B] p-6 shadow-lg">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-white">
                    {character.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#0F172A] px-3 py-1 text-sm text-gray-400">
                      {character.race}
                    </span>
                    <span className="text-sm text-gray-500">
                      {character.gender}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${isFavorite ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-400 hover:text-[#D4AF37]"}`}
                  />
                </button>
              </div>

              <div className="mb-6 border-t border-[#334155] pt-6">
                <p className="mb-2 text-sm text-gray-400">
                  Current Power Level
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-white">
                    $
                    {character.powerLevel.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 text-[#22C55E]" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-[#EF4444]" />
                  )}
                  <span
                    className={`text-lg font-semibold ${isPositive ? "text-[#22C55E]" : "text-[#EF4444]"}`}
                  >
                    {isPositive ? "+" : ""}
                    {character.powerChange.toFixed(2)}%
                  </span>
                  <span className="text-sm text-gray-400">24h</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-[#334155] pt-6">
                <div>
                  <p className="mb-1 text-sm text-gray-400">Birth</p>
                  <p className="font-medium text-white">{character.birth}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-400">Death</p>
                  <p className="font-medium text-white">{character.death}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-400">Realm</p>
                  <p className="font-medium text-white">{character.realm}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-400">Spouse</p>
                  <p className="font-medium text-white">{character.spouse}</p>
                </div>
                <div>
                  <a
                    href={character.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#D4AF37] transition-colors hover:text-[#B8941F]"
                  >
                    <span>View on Wiki</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-xl bg-[#1E293B] p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  Power History (30 Days)
                </h2>
                <p className="text-sm text-gray-400">
                  Historical power level trends
                </p>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748B"
                    tick={{ fill: "#64748B" }}
                  />
                  <YAxis stroke="#64748B" tick={{ fill: "#64748B" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value: number | undefined) => [
                      value !== undefined ? `${value.toFixed(2)}` : "0.00",
                      "Power Level",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#D4AF37"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
