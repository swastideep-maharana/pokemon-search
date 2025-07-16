import { useEffect, useState } from "react";

export function usePokemonByType(type: string) {
  const [pokemon, setPokemon] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) return;
    async function fetchByType() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon by type");
        const data = await res.json();
        setPokemon(data.pokemon.map((p: any) => p.pokemon));
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchByType();
  }, [type]);

  return { pokemon, loading, error };
}
