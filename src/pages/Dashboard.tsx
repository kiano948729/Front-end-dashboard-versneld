import { useEffect, useState } from "react";
import { api } from "../api/api";
import { type Character } from "../types/character";

const Dashboard = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get("/character");
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
  for(let i = 0; i < characters.length; i++) {
    console.log(characters[i].name);
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Lord of the Rings Dashboard
      </h1>

      <p>Aantal characters: {characters.length}</p>
      <p>Voorbeeld character: {characters[0]?.name}</p>

    </div>
  );
};

export default Dashboard;