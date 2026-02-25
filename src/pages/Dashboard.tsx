import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Character } from "../types/character";

const Dashboard = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get("/character?limit=100");
        setCharacters(response.data.docs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Market Overview
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        Characters loaded: {characters.length}
      </div>
    </div>
  );
};

export default Dashboard;