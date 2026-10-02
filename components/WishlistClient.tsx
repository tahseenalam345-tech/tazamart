"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function WishlistClient() {
  const { wishlist } = useStore();
  const items = wishlist
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        My Wishlist
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            message="Tap the heart icon on any product to save it here for later."
            actionLabel="Discover Products"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
