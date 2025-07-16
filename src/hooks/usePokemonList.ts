import { useEffect, useState } from "react";

export function usePokemonList(limit: number, offset: number) {
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        if (!res.ok) throw new Error("Failed to fetch Pokémon");
        const data = await res.json();
        setPokemon(data.results);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [limit, offset]);

  return { pokemon, loading, error };
}
