"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`
    );
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full rounded-full border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
      >
        Shop Now
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
