"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

export interface ProductTab {
  label: string;
  products: Product[];
}

export default function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div>
      <div className="nice-scroll mb-6 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
              i === active
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-brand-300 hover:text-brand-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {current && current.products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {current.products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
          No products in this tab yet — check back soon.
        </p>
      )}
    </div>
  );
}
