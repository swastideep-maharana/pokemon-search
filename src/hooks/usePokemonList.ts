import { useEffect, useState } from "react";

export interface PokemonListItem {
  name: string;
  url: string;
}

export function usePokemonList(limit: number = 50, offset: number = 0) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
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
        const data = await res.json();
        setPokemon(data.results);
      } catch (err) {
        setError("Failed to fetch Pokémon list");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [limit, offset]);

  return { pokemon, loading, error };
}
