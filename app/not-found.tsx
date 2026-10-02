import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { BRAND } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="text-center">
        <p className="text-7xl font-extrabold tracking-tight text-brand-600 sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          This aisle doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-slate-500">
          The page you&apos;re looking for has moved, or was never on our
          shelves. Let&apos;s get you back to the fresh stuff.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-600 px-7 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            <SearchX size={16} />
            Browse Products
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-400">
          {BRAND.name} · {BRAND.tagline}
        </p>
      </div>
    </div>
  );
}
