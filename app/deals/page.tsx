import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, Tag } from "lucide-react";
import { deals, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Deals & Discounts – TazaMart",
  description:
    "Today's best grocery deals in Karachi. Fresh discounts on fruits, dairy, meat and more — up to 30% off, gone by midnight.",
};

export default function DealsPage() {
  const allSale = products.filter(
    (p) => p.oldPrice && p.oldPrice > p.price && !p.deal
  );

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-12">
        <div className="relative z-10 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              <BadgePercent size={16} />
              Limited time
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Today&apos;s Best Deals
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
              Fresh discounts on your everyday favourites. Prices this good
              don&apos;t wait — these deals end at midnight.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-white/70">
              Deals end in
            </p>
            <CountdownTimer dark />
          </div>
        </div>
        <span className="pointer-events-none absolute -bottom-10 -right-6 text-white/5">
          <Tag size={260} />
        </span>
      </section>

      {/* Deals of the day */}
      <section>
        <SectionHeading
          title="Deals of the Day"
          subtitle="Hand-picked discounts, refreshed every morning."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* All deals */}
      <section>
        <SectionHeading
          title="All Discounted Items"
          subtitle="Every product currently on sale across the store."
        />
        {allSale.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
            {allSale.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
            No additional discounts right now. Check back tomorrow.
          </p>
        )}
      </section>

      <div className="rounded-2xl bg-brand-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          Want an extra 10% off your first order? Use code{" "}
          <span className="font-bold text-brand-700">WELCOME</span> at checkout,{" "}
          <Link
            href="/shop"
            className="font-semibold text-brand-700 hover:underline"
          >
            or keep shopping
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
