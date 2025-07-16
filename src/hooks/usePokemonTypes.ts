import { useEffect, useState } from "react";

export function usePokemonTypes() {
  const [types, setTypes] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTypes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        if (!res.ok) throw new Error("Failed to fetch types");
        const data = await res.json();
        setTypes(data.results);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTypes();
  }, []);

  return { types, loading, error };
}
