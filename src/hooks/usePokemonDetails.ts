import { useEffect, useState } from "react";

export interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export function usePokemonDetails(name: string) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setDetails(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data: PokemonDetails) => setDetails(data))
      .catch(() => setError("Failed to fetch Pokémon details"))
      .finally(() => setLoading(false));
  }, [name]);

  return { details, loading, error };
}
