"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";
import type { Badge, Category, Product } from "@/lib/data";
import { discountPercent, formatRs } from "@/lib/data";
import { useStore } from "@/lib/store";
import Stars from "./Stars";
import QtyStepper from "./QtyStepper";
import ProductCard from "./ProductCard";

const badgeStyles: Record<Badge, string> = {
  Fresh: "bg-brand-100 text-brand-700",
  Organic: "bg-teal-100 text-teal-700",
  "Best Seller": "bg-orange-100 text-orange-700",
  Sale: "bg-red-100 text-red-600",
};

const reviews = [
  {
    name: "Ayesha Khan",
    date: "September 28, 2026",
    rating: 5,
    title: "Better than my local market",
    text: "Honestly impressed. Everything arrived chilled and properly packed. The quality is consistently better than what I was getting from my neighbourhood sabzi wala.",
  },
  {
    name: "Bilal Ahmed",
    date: "September 20, 2026",
    rating: 4,
    title: "Fresh and on time",
    text: "Ordered in the morning, delivered the same evening. Packaging was neat and the product looked exactly like the pictures. Will order again.",
  },
  {
    name: "Fatima Raza",
    date: "September 12, 2026",
    rating: 5,
    title: "My weekly staple now",
    text: "This has become part of my weekly routine. Prices are fair, the app experience is smooth, and customer support actually responds. Highly recommended.",
  },
];

export default function ProductDetail({
  product,
  category,
  related,
}: {
  product: Product;
  category: Category | undefined;
  related: Product[];
}) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "reviews">("description");
  const wished = isWishlisted(product.slug);
  const off = discountPercent(product);
  const inStock = product.stock > 0;

  const buyNow = () => {
    addToCart(product.slug, qty);
    router.push("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400">
        <Link href="/" className="transition hover:text-brand-700">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link href="/shop" className="transition hover:text-brand-700">
          Shop
        </Link>
        <ChevronRight size={13} />
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="transition hover:text-brand-700"
            >
              {category.name}
            </Link>
            <ChevronRight size={13} />
          </>
        )}
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-mist shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute left-4 top-4 flex gap-2">
            {product.badge && (
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${badgeStyles[product.badge]}`}
              >
                {product.badge}
              </span>
            )}
            {off && (
              <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
                {off}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="text-xs font-bold uppercase tracking-widest text-brand-600 hover:text-brand-700"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">{product.unit}</p>

          <div className="mt-3 flex items-center gap-2">
            <Stars rating={product.rating} size={16} />
            <span className="text-sm font-semibold text-slate-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-400">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3 rounded-2xl bg-mist p-5">
            <span className="text-3xl font-extrabold text-slate-900">
              {formatRs(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatRs(product.oldPrice)}
                </span>
                <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
                  Save {formatRs(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyStepper value={qty} onChange={(v) => setQty(Math.max(1, v))} />
            <button
              type="button"
              onClick={() => addToCart(product.slug, qty)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 sm:flex-none sm:px-8"
            >
              <ShoppingCart size={17} />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              <Zap size={16} />
              Buy Now
            </button>
            <button
              type="button"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist(product.slug)}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition ${
                wished
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500"
              }`}
            >
              <Heart size={19} className={wished ? "fill-red-500" : ""} />
            </button>
          </div>

          <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
            <p className="flex items-center gap-2 text-slate-600">
              <BadgeCheck size={16} className="text-brand-600" />
              {inStock ? (
                <span>
                  <span className="font-semibold text-brand-700">In stock</span>{" "}
                  — ready to ship today
                </span>
              ) : (
                <span className="font-semibold text-red-600">Out of stock</span>
              )}
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <Truck size={16} className="text-brand-600" />
              Free delivery on orders over Rs 2,000
            </p>
            <p className="text-slate-400">
              SKU: <span className="font-mono text-slate-600">{product.id.toUpperCase()}-PK</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-2 border-b border-slate-200">
          {(["description", "reviews"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-bold capitalize transition ${
                tab === t
                  ? "border-b-2 border-brand-600 text-brand-700"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t}
              {t === "reviews" && (
                <span className="ml-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {reviews.length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="py-6">
          {tab === "description" ? (
            <div className="max-w-3xl">
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <BadgeCheck size={15} className="text-brand-600" />
                  Quality-checked before dispatch
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={15} className="text-brand-600" />
                  Hygienically packed for freshness
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={15} className="text-brand-600" />
                  Sourced from trusted local suppliers
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={15} className="text-brand-600" />
                  Easy 24-hour return window
                </li>
              </ul>
            </div>
          ) : (
            <div className="grid max-w-4xl gap-4 md:grid-cols-3">
              {reviews.map((r) => (
                <div
                  key={r.name}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <Stars rating={r.rating} />
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {r.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {r.text}
                  </p>
                  <p className="mt-3 text-xs font-semibold text-slate-700">
                    {r.name}
                  </p>
                  <p className="text-xs text-slate-400">{r.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-slate-900">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
