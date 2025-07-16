import { useEffect, useState } from "react";

export function usePokemonDetails(name: string) {
  const [details, setDetails] = useState<any>(null);
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
      .then((data) => setDetails(data))
      .catch(() => setError("Failed to fetch Pokémon details"))
      .finally(() => setLoading(false));
  }, [name]);

  return { details, loading, error };
}
