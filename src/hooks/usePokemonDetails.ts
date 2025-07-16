import { useEffect, useState } from "react";

export function usePokemonDetails(name: string) {
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await res.json();
        setDetails(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (name) fetchDetails();
  }, [name]);

  return { details, loading, error };
}
