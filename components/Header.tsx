"use client";

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          i ain&apos;t reading all that
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          your daily AI news tldr — no cap
        </p>
      </div>
    </header>
  );
}
