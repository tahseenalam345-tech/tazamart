"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductGrid({
  products,
  showCount = true,
}: {
  products: Product[];
  showCount?: boolean;
}) {
  const [sort, setSort] = useState<SortKey>("featured");

  const sorted = useMemo(() => {
    const list = [...products];
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
  }, [products, sort]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        {showCount && (
          <p className="text-sm text-slate-500">
            <span className="font-bold text-slate-900">{sorted.length}</span>{" "}
            products
          </p>
        )}
        <label className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
          <ArrowUpDown size={15} className="text-slate-400" />
          <span className="hidden text-slate-500 sm:inline">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent font-semibold text-slate-700 outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {sorted.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {sorted.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-6 py-14 text-center text-sm text-slate-500 shadow-sm">
          No products match your filters. Try adjusting them.
        </p>
      )}
    </div>
  );
}
