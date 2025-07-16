"use client";

import React, { useState } from "react";
import { usePokemonTypes } from "@/hooks/usePokemonTypes";
import { usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonByType } from "@/hooks/usePokemonByType";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

function getPokemonId(nameOrUrl: string): string {
  if (nameOrUrl.startsWith("http")) {
    const match = nameOrUrl.match(/\/pokemon\/(\d+)\/?$/);
    return match ? match[1] : "";
  }
  return nameOrUrl;
}

function getSpriteUrl(nameOrUrl: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
    nameOrUrl
  )}.png`;
}

type Pokemon = { name: string; url: string };

export default function Home() {
  const { types, loading: typesLoading, error: typesError } = usePokemonTypes();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const {
    pokemon: allPokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemonList(50, 0);
  const {
    pokemon: typePokemon,
    loading: typeLoading,
    error: typeError,
  } = usePokemonByType(selectedType);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();

  const pokemonList: Pokemon[] = selectedType ? typePokemon : allPokemon;
  const filteredPokemon: Pokemon[] = pokemonList.filter((p: Pokemon) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const favoritePokemon: Pokemon[] = favorites
    .map((fav) => pokemonList.find((p) => p.name === fav))
    .filter((p): p is Pokemon => Boolean(p));

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white dark:bg-gray-900">
      <main className="max-w-3xl mx-auto flex flex-col gap-8">
        {favorites.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-2 text-yellow-700 dark:text-yellow-300">
              Favorites
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {favoritePokemon.map((poke: Pokemon) => (
                <div
                  key={poke.name}
                  className="bg-yellow-100 dark:bg-yellow-700 rounded-lg p-2 flex flex-col items-center shadow min-w-[100px] cursor-pointer hover:bg-yellow-200 dark:hover:bg-yellow-600 transition"
                  onClick={() => router.push(`/pokemon/${poke.name}`)}
                >
                  <img
                    src={getSpriteUrl(poke.url)}
                    alt={poke.name}
                    className="w-10 h-10 mb-1"
                    loading="lazy"
                  />
                  <span className="capitalize font-semibold text-sm">
                    {poke.name}
                  </span>
                  <button
                    className="mt-1 text-xs text-red-600 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(poke.name);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
        <form
          className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow"
          onSubmit={(e) => e.preventDefault()}
        >
          <select
            className="w-full sm:w-48 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            disabled={typesLoading}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            className="w-full sm:w-64 p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {(typesLoading || pokemonLoading || typeLoading) && (
          <div className="text-center text-gray-500">Loading...</div>
        )}
        {(typesError || pokemonError || typeError) && (
          <div className="text-center text-red-500">
            {typesError || pokemonError || typeError}
          </div>
        )}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredPokemon.length === 0 && !(pokemonLoading || typeLoading) && (
            <div className="col-span-full text-center text-gray-400">
              No Pokémon found.
            </div>
          )}
          {filteredPokemon.map((poke: Pokemon) => (
            <div
              key={poke.name}
              className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow h-40 justify-center text-gray-900 dark:text-white cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-700 transition relative ${
                isFavorite(poke.name) ? "ring-2 ring-yellow-400" : ""
              }`}
              onClick={() => router.push(`/pokemon/${poke.name}`)}
            >
              <button
                className={`absolute top-2 right-2 text-xl ${
                  isFavorite(poke.name) ? "text-yellow-400" : "text-gray-300"
                }`}
                title={
                  isFavorite(poke.name) ? "Unmark Favorite" : "Mark as Favorite"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(poke.name);
                }}
              >
                ★
              </button>
              <img
                src={getSpriteUrl(poke.url)}
                alt={poke.name}
                className="w-16 h-16 mb-2"
                loading="lazy"
              />
              <span className="capitalize font-semibold text-lg">
                {poke.name}
              </span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
