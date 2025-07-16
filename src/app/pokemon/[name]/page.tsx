import React from "react";
import Link from "next/link";
import Image from "next/image";

async function getPokemonDetails(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }: { params: { name: string } }) {
  const name = params.name;
  const details = await getPokemonDetails(name);
  if (!details) {
    return (
      <div className="min-h-screen p-4 sm:p-8 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <nav
            className="text-sm text-gray-700 dark:text-gray-200 mb-2"
            aria-label="Breadcrumb"
          >
            <ol className="list-reset flex">
              <li>
                <Link href="/" className="hover:underline text-blue-600">
                  Home
                </Link>
              </li>
              <li className="mx-2">→</li>
              <li className="capitalize font-semibold">{name}</li>
            </ol>
          </nav>
          <Link href="/" className="text-blue-600 hover:underline mb-2 w-fit">
            ← Back to Home
          </Link>
          <div className="text-center text-red-500">Pokémon not found.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <nav
          className="text-sm text-gray-700 dark:text-gray-200 mb-2"
          aria-label="Breadcrumb"
        >
          <ol className="list-reset flex">
            <li>
              <Link href="/" className="hover:underline text-blue-600">
                Home
              </Link>
            </li>
            <li className="mx-2">→</li>
            <li className="capitalize font-semibold">{name}</li>
          </ol>
        </nav>
        <Link href="/" className="text-blue-600 hover:underline mb-2 w-fit">
          ← Back to Home
        </Link>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow">
          <Image
            src={details.sprites?.front_default}
            alt={details.name}
            width={128}
            height={128}
            className="w-32 h-32 mb-4"
            unoptimized
          />
          <h2 className="capitalize text-3xl font-bold mb-2">{details.name}</h2>
          <div className="flex gap-2 mb-4">
            {details.types.map((t: { type: { name: string } }) => (
              <span
                key={t.type.name}
                className="px-3 py-1 rounded-full bg-yellow-300 text-gray-900 text-xs font-semibold capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
          <div className="w-full">
            <h3 className="font-semibold mb-2">Stats</h3>
            <ul className="grid grid-cols-2 gap-2">
              {details.stats.map(
                (s: { stat: { name: string }; base_stat: number }) => (
                  <li key={s.stat.name} className="flex justify-between">
                    <span className="capitalize text-gray-700 dark:text-gray-200">
                      {s.stat.name}
                    </span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      {s.base_stat}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
