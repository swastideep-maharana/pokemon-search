import { useEffect, useState } from "react";

export interface PokemonListItem {
  name: string;
  url: string;
}

export function usePokemonByType(type: string) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) {
      setPokemon([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.pokemon.map((p: any) => p.pokemon));
      })
      .catch(() => setError("Failed to fetch Pokémon by type"))
      .finally(() => setLoading(false));
  }, [type]);

  return { pokemon, loading, error };
}
