"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown, SearchX, SlidersHorizontal, X } from "lucide-react";
import { categories, products, searchProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const priceRanges = [
  { label: "Under Rs 300", min: 0, max: 300 },
  { label: "Rs 300 – Rs 700", min: 300, max: 700 },
  { label: "Rs 700 – Rs 1,500", min: 700, max: 1500 },
  { label: "Above Rs 1,500", min: 1500, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category");
  const initialSale = searchParams.get("sale") === "1";

  const [q] = useState(initialQ);
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceIdx, setPriceIdx] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [onSale, setOnSale] = useState(initialSale);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = q ? searchProducts(q) : [...products];
    if (selectedCats.length > 0)
      list = list.filter((p) => selectedCats.includes(p.category));
    if (priceIdx !== null) {
      const r = priceRanges[priceIdx];
      list = list.filter((p) => p.price >= r.min && p.price < r.max);
    }
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (onSale) list = list.filter((p) => p.oldPrice && p.oldPrice > p.price);

    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [q, selectedCats, priceIdx, minRating, onSale, sort]);

  const toggleCat = (slug: string) =>
    setSelectedCats((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const clearAll = () => {
    setSelectedCats([]);
    setPriceIdx(null);
    setMinRating(0);
    setOnSale(false);
  };

  const activeFilterCount =
    selectedCats.length +
    (priceIdx !== null ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onSale ? 1 : 0);

  const filters = (
    <div className="space-y-7">
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
          Category
        </h4>
        <div className="space-y-2">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={selectedCats.includes(c.slug)}
                onChange={() => toggleCat(c.slug)}
                className="h-4 w-4 rounded accent-brand-600"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
          Price
        </h4>
        <div className="space-y-2">
          {priceRanges.map((r, i) => (
            <label
              key={r.label}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="price"
                checked={priceIdx === i}
                onChange={() => setPriceIdx(i)}
                className="h-4 w-4 accent-brand-600"
              />
              {r.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-900">
          Rating
        </h4>
        <div className="flex gap-2">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                minRating === r
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between text-sm font-medium text-slate-700">
        On sale only
        <button
          type="button"
          role="switch"
          aria-checked={onSale}
          onClick={() => setOnSale(!onSale)}
          className={`relative h-6 w-11 rounded-full transition ${
            onSale ? "bg-brand-600" : "bg-slate-200"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              onSale ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      </label>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-sm font-semibold text-red-600 hover:underline"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          {q ? (
            <>
              Results for <span className="text-brand-700">“{q}”</span>
            </>
          ) : (
            "Shop All Products"
          )}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
          products found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-40 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            {filters}
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <label className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
              <ArrowUpDown size={15} className="text-slate-400" />
              <span className="hidden text-slate-500 sm:inline">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent font-semibold text-slate-700 outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
              <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <SearchX size={28} />
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                No products found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Try a different search term or adjust your filters to find what
                you&apos;re looking for.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        onClick={() => setFiltersOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity lg:hidden ${
          filtersOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          filtersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">Filters</h3>
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        {filters}
        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="mt-8 w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Show {filtered.length} products
        </button>
      </aside>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500">
          Loading products...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
