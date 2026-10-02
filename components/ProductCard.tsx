"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Badge, Product } from "@/lib/data";
import { discountPercent, formatRs, getCategory } from "@/lib/data";
import { useStore } from "@/lib/store";
import Stars from "./Stars";

const badgeStyles: Record<Badge, string> = {
  Fresh: "bg-brand-100 text-brand-700",
  Organic: "bg-teal-100 text-teal-700",
  "Best Seller": "bg-orange-100 text-orange-700",
  Sale: "bg-red-100 text-red-600",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.slug);
  const off = discountPercent(product);
  const category = getCategory(product.category);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block">
          <span className="relative block aspect-square overflow-hidden bg-mist">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </span>
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeStyles[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
          {off && (
            <span className="rounded-full bg-red-600 px-2.5 py-1 text-[11px] font-bold text-white">
              {off}% OFF
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.slug)}
          className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition ${
            wished
              ? "bg-red-50 text-red-500"
              : "bg-white text-slate-400 hover:text-red-500"
          }`}
        >
          <Heart size={17} className={wished ? "fill-red-500" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {category.name}
          </span>
        )}
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-1 font-bold text-slate-900 transition hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-400">{product.unit}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Stars rating={product.rating} />
          <span className="text-xs text-slate-400">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-slate-900">
            {formatRs(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatRs(product.oldPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product.slug, 1);
            setCartOpen(true);
          }}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
