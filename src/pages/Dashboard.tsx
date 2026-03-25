import { useState, useEffect, useMemo } from "react";
import { Users, Shield, TrendingUp } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import KPICard from "../components/KPICard";
import MarketShareChart from "../components/MarketShareChart";
import SearchFilterBar from "../components/SearchFilterBar";
import AssetCard from "../components/AssetCard";
import type { ApiCharacter, Character } from "../types/character";
import { api } from "../api/api";
import { mapApiCharactersToCharacters } from "../utils/characterMapper";

export function getUniqueRaces(characters: Character[]): string[] {
  return Array.from(new Set(characters.map((c) => c.race)));
}

export function getRaceDistribution(
  characters: Character[],
): { name: string; value: number }[] {
  const counts: Record<string, number> = {};
  characters.forEach((c) => {
    counts[c.race] = (counts[c.race] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export default function Dashboard() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  useEffect(() => {
    async function fetchCharacters() {
      setLoading(true);
      setError("");
      try {
        const response = await api.get<{ docs: ApiCharacter[] }>("/character");
        const data = response.data.docs;

        const mappedCharacters = mapApiCharactersToCharacters(data);
        setCharacters(mappedCharacters);
      } catch (err: any) {
        console.error("Failed to fetch characters:", err);
        setError("Failed to load characters");
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  const races = useMemo(() => getUniqueRaces(characters), [characters]);
  const raceDistribution = useMemo(
    () => getRaceDistribution(characters),
    [characters],
  );

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchesSearch = char.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRace = !selectedRace || char.race === selectedRace;

      const matchesFavorites = !showFavorites || char.isFavorite;

      return matchesSearch && matchesRace && matchesFavorites;
    });
  }, [characters, searchTerm, selectedRace, showFavorites]);

  const favoriteCount = characters.filter((c) => c.isFavorite).length;
  const totalRaces = races.length;
  const avgChange =
    characters.reduce((sum, c) => sum + c.powerChange, 0) /
    (characters.length || 1);
  const marketSentiment = avgChange > 0 ? "Bullish" : "Bearish";

  const handleToggleFavorite = (id: string) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char._id === id ? { ...char, isFavorite: !char.isFavorite } : char,
      ),
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
        Loading characters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar
        favoriteCount={favoriteCount}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites((prev) => !prev)}
      />
      <main className="w-full min-h-screen px-6 py-8">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <KPICard
            title="Total Assets"
            value={`${characters.length} Characters`}
            icon={Users}
          />
          <KPICard
            title="Total Races"
            value={totalRaces}
            icon={Shield}
            subtitle="Across Middle-earth"
          />
          <KPICard
            title="Market Sentiment"
            value={marketSentiment}
            icon={TrendingUp}
            subtitle={`${avgChange > 0 ? "+" : ""}${avgChange.toFixed(2)}% avg`}
          />
        </div>

        <div className="mb-8">
          <MarketShareChart data={raceDistribution} />
        </div>

        <div className="mb-6">
          <SearchFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRace={selectedRace}
            onRaceChange={setSelectedRace}
            races={races}
          />
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Character Assets</h2>
            <span className="text-sm text-gray-400">
              {filteredCharacters.length} of {characters.length} assets
            </span>
          </div>

          {filteredCharacters.length === 0 ? (
            <div className="rounded-xl bg-[#1E293B] p-12 text-center">
              <p className="text-gray-400">No characters found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCharacters.map((character) => (
                <AssetCard
                  key={character._id}
                  character={character}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
