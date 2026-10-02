import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Leaf,
  RotateCcw,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import {
  BRAND,
  categories,
  deals,
  getProduct,
  products,
  productsByCategory,
} from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import ProductTabs from "@/components/ProductTabs";
import CountdownTimer from "@/components/CountdownTimer";
import HeroSearch from "@/components/HeroSearch";

export const metadata: Metadata = {
  title: "TazaMart – Fresh Groceries Delivered in Karachi",
  description:
    "Shop fresh fruits, vegetables, dairy, bakery, meat and daily essentials online. Fast delivery across Karachi. Fresh Food, Happy Life.",
};

const heroImg =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";

const trustBadges = [
  { icon: BadgeCheck, title: "Fresh & Quality", text: "Products" },
  { icon: Truck, title: "Fast & Reliable", text: "Delivery" },
  { icon: ShieldCheck, title: "Secure", text: "Payments" },
  { icon: RotateCcw, title: "Easy", text: "Returns" },
];

const promoBanners = [
  {
    eyebrow: "Fresh Fruits",
    title: "Up to 30% Off",
    bg: "bg-brand-700",
    btn: "bg-white text-brand-800 hover:bg-brand-50",
    href: "/category/fruits-vegetables",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
  },
  {
    eyebrow: "Daily Essentials",
    title: "Better Prices Every Day",
    bg: "bg-orange-500",
    btn: "bg-white text-orange-700 hover:bg-orange-50",
    href: "/category/dairy-eggs",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
  },
  {
    eyebrow: "Organic Products",
    title: "Pure & Natural",
    bg: "bg-brand-900",
    btn: "bg-white text-brand-900 hover:bg-brand-50",
    href: "/shop?sale=1",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
  },
];

const needs = [
  {
    title: "Quick Meals",
    text: "Ready in minutes",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    href: "/shop",
  },
  {
    title: "Healthy Living",
    text: "Eat better",
    image:
      "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80",
    href: "/shop",
  },
  {
    title: "Budget Friendly",
    text: "Save more",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    href: "/deals",
  },
  {
    title: "Family Packs",
    text: "For everyone",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
    href: "/shop",
  },
];

function bySlug(slug: string) {
  const p = getProduct(slug);
  if (!p) throw new Error(`Missing product: ${slug}`);
  return p;
}

export default function HomePage() {
  const popularTabs = [
    { label: "All", products: products.slice(0, 10) },
    { label: "Fruits", products: productsByCategory("fruits-vegetables").slice(0, 5) },
    { label: "Dairy", products: productsByCategory("dairy-eggs") },
    { label: "Bakery", products: productsByCategory("bakery-bread") },
    { label: "Snacks", products: productsByCategory("snacks-beverages").slice(0, 5) },
    {
      label: "Beverages",
      products: ["orange-juice", "green-tea", "chocolate-milk", "fresh-milk"].map(bySlug),
    },
  ];

  const bestSellerTabs = [
    {
      label: "Fruits",
      products: ["red-apples", "ripe-mangoes", "strawberries", "kinnow-oranges"].map(bySlug),
    },
    {
      label: "Vegetables",
      products: ["fresh-tomatoes", "organic-spinach", "avocado", "green-grapes"].map(bySlug),
    },
    { label: "Dairy", products: productsByCategory("dairy-eggs").slice(0, 4) },
    { label: "Bakery", products: productsByCategory("bakery-bread").slice(0, 4) },
    {
      label: "Snacks",
      products: productsByCategory("snacks-beverages").slice(0, 4),
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 sm:py-10">
        {/* ─── Hero ─── */}
        <section className="overflow-hidden rounded-3xl bg-brand-50">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                Fresh · Healthy · Always
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
                Fresh Groceries
                <br />
                Delivered to
                <br />
                <span className="text-brand-700">Your Doorstep</span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
                Shop from a wide range of fresh fruits, vegetables, dairy,
                pantry staples and more. Quality you can trust, convenience
                you&apos;ll love — delivered across Karachi.
              </p>
              <div className="mt-6 max-w-md">
                <HeroSearch />
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {trustBadges.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-center gap-2.5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs font-semibold leading-tight text-slate-700">
                      {title}
                      <br />
                      <span className="font-normal text-slate-500">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-b-3xl rounded-t-[999px] shadow-xl">
                <Image
                  src={heroImg}
                  alt="Fresh vegetables in a basket"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -left-4 top-10 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8">
                <p className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                  <Heart size={15} className="fill-red-500 text-red-500" />
                  Good Food
                </p>
                <p className="text-xs text-slate-500">Better Life</p>
              </div>
              <div className="absolute -right-3 bottom-12 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-right-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Leaf size={17} />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500">Organic</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Shop by Category ─── */}
        <section>
          <SectionHeading
            title="Shop by Category"
            subtitle="Everything you need for the week, organised the way you shop."
            linkLabel="View All"
            linkHref="/shop"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </section>

        {/* ─── Promo banners ─── */}
        <section className="grid gap-5 md:grid-cols-3">
          {promoBanners.map((b) => (
            <Link
              key={b.title}
              href={b.href}
              className={`group relative flex min-h-44 items-center overflow-hidden rounded-2xl ${b.bg} p-6 text-white`}
            >
              <div className="relative z-10 max-w-[60%]">
                <p className="text-sm font-medium text-white/80">{b.eyebrow}</p>
                <h3 className="mt-1 text-xl font-extrabold leading-snug">
                  {b.title}
                </h3>
                <span
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${b.btn}`}
                >
                  Shop Now <ArrowRight size={13} />
                </span>
              </div>
              <div className="absolute -right-6 top-1/2 h-36 w-36 -translate-y-1/2 overflow-hidden rounded-full sm:h-40 sm:w-40">
                <Image
                  src={b.image}
                  alt={b.eyebrow}
                  fill
                  sizes="160px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </section>

        {/* ─── Popular Products ─── */}
        <section>
          <SectionHeading
            title="Popular Products"
            subtitle="Customer favourites, restocked fresh every day."
          />
          <ProductTabs tabs={popularTabs} />
        </section>

        {/* ─── Deals of the Day ─── */}
        <section className="rounded-3xl bg-mist p-6 sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                <Zap size={24} className="fill-orange-500 text-orange-500" />
                Deals of the Day
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Fresh discounts, gone by midnight. Don&apos;t miss out.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CountdownTimer />
              <Link
                href="/deals"
                className="hidden items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:gap-2.5 sm:inline-flex"
              >
                View All Deals <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {deals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* ─── Promo row: free delivery + rewards ─── */}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white">
            <div className="relative z-10 max-w-[65%]">
              <p className="text-sm font-medium text-brand-200">
                Free Delivery
              </p>
              <h3 className="mt-1 text-2xl font-extrabold leading-snug">
                On Your First Order
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Use code <span className="font-bold text-amber-300">WELCOME</span>{" "}
                at checkout
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-900 transition hover:bg-brand-50"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
            <span className="absolute -right-4 bottom-0 top-0 flex items-center text-white/10">
              <Truck size={140} />
            </span>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-orange-500 p-8 text-white">
            <div className="relative z-10 max-w-[65%]">
              <p className="text-sm font-medium text-orange-100">
                Join {BRAND.name} Rewards
              </p>
              <h3 className="mt-1 text-2xl font-extrabold leading-snug">
                Earn Points on Every Order
              </h3>
              <p className="mt-2 text-sm text-white/80">
                Unlock exclusive offers and member-only deals
              </p>
              <Link
                href="/account"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-orange-700 transition hover:bg-orange-50"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
            <span className="absolute -right-4 bottom-0 top-0 flex items-center text-white/15">
              <Gift size={140} />
            </span>
          </div>
        </section>

        {/* ─── Shop by Needs ─── */}
        <section>
          <SectionHeading
            title="Shop by Needs"
            subtitle="Curated picks for every kind of week."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {needs.map((n) => (
              <Link
                key={n.title}
                href={n.href}
                className="group relative min-h-52 overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
                <span className="absolute bottom-0 left-0 p-5 text-white">
                  <span className="block text-lg font-extrabold">{n.title}</span>
                  <span className="text-sm text-white/80">{n.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Best Selling Products ─── */}
        <section>
          <SectionHeading
            title="Best Selling Products"
            subtitle="The items Karachi keeps coming back for."
            linkLabel="View All"
            linkHref="/shop"
          />
          <ProductTabs tabs={bestSellerTabs} />
        </section>

        {/* ─── Full-width banner ─── */}
        <section className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80"
            alt="Fresh produce at a market"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-950/60" />
          <div className="relative z-10 flex flex-col items-start gap-4 p-8 sm:p-14 lg:max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Good Food
              <br />
              Brings People Together
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              At {BRAND.name}, we&apos;re committed to providing you with the
              freshest products, best prices and a healthier tomorrow.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
