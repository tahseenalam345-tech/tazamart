"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Truck,
  User,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { BRAND, categories } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, wishlist, setCartOpen } = useStore();
  const [query, setQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-[13px]">
          <Truck size={14} className="shrink-0 text-brand-300" />
          <span>
            Free delivery on orders over Rs 2,000 · Use code{" "}
            <span className="font-bold text-amber-300">WELCOME</span> for 10% off
            your first order
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          {/* Main row */}
          <div className="flex h-16 items-center gap-3 sm:gap-6">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <Link href="/" className="flex shrink-0 items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Leaf size={22} />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-extrabold tracking-tight text-slate-900">
                  {BRAND.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-brand-600">
                  {BRAND.tagline}
                </span>
              </span>
            </Link>

            {/* Desktop search */}
            <form
              onSubmit={submitSearch}
              className="hidden flex-1 items-center md:flex"
            >
              <div className="relative w-full max-w-xl">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for fresh groceries, fruits, vegetables..."
                  className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-24 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-brand-600 px-5 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <Link
                href="/track-order"
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-700 xl:inline-flex"
              >
                <Package size={18} />
                Track Order
              </Link>
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                href="/account"
                aria-label="My account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-brand-700 sm:inline-flex"
              >
                <User size={20} />
              </Link>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
                className="relative inline-flex h-10 items-center gap-2 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={submitSearch} className="pb-3 md:hidden">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white"
              />
            </div>
          </form>
        </div>

        {/* Nav row */}
        <nav className="hidden border-t border-slate-100 lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4">
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                type="button"
                className="my-2 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                <Menu size={16} />
                All Categories
                <ChevronDown
                  size={15}
                  className={`transition-transform ${catOpen ? "rotate-180" : ""}`}
                />
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      {c.name}
                      <span className="text-xs text-slate-300">→</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
            <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <MapPin size={15} className="text-brand-600" />
              Deliver to {BRAND.city}
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Leaf size={19} />
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {BRAND.name}
            </span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="nice-scroll flex-1 overflow-y-auto px-3 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/track-order"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
          >
            Track Order
          </Link>
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
          >
            My Account
          </Link>
          <p className="px-4 pb-2 pt-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Categories
          </p>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <MapPin size={15} className="text-brand-600" />
            Deliver to {BRAND.city}
          </p>
        </div>
      </aside>
    </>
  );
}
