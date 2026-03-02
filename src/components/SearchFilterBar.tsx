import { Search, Filter } from "lucide-react";

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRace: string;
  onRaceChange: (value: string) => void;
  races: string[];
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  selectedRace,
  onRaceChange,
  races,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search character..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg bg-[#1E293B] py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      <div className="relative sm:w-64">
        <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <select
          value={selectedRace}
          onChange={(e) => onRaceChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-[#1E293B] py-3 pl-12 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        >
          <option value="">All Races</option>
          {races.map((race) => (
            <option key={race} value={race}>
              {race}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
