"use client";

export default function Header() {
  return (
    <header className="border-b-4 border-black bg-[#ffe156]">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
          i ain&apos;t reading all that
        </h1>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide text-black/60">
          ur daily AI news, but make it unhinged.
        </p>
      </div>
    </header>
  );
}
