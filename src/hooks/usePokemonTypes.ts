import { useEffect, useState } from "react";

export interface PokemonType {
  name: string;
  url: string;
}

export function usePokemonTypes() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTypes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        const data = await res.json();
        setTypes(data.results);
      } catch (err) {
        setError("Failed to fetch types");
      } finally {
        setLoading(false);
      }
    }
    fetchTypes();
  }, []);

  return { types, loading, error };
}
