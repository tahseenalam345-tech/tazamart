import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  HandHeart,
  Leaf,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us – TazaMart",
  description:
    "TazaMart's story: bringing farm-fresh groceries to Karachi doorsteps with quality you can trust. Fresh Food, Happy Life.",
};

const stats = [
  { value: "50k+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "30+", label: "Areas Served" },
  { value: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: Leaf,
    title: "Freshness First",
    text: "Produce is sourced every morning from trusted farms and checked piece by piece before it reaches your bag.",
  },
  {
    icon: Award,
    title: "Honest Quality",
    text: "What you see is what you get. If anything arrives below standard, we replace it — no questions, no forms.",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    text: "Chilled vans, planned routes and live tracking mean your groceries arrive fresh, in the slot you picked.",
  },
  {
    icon: HandHeart,
    title: "Fair to Farmers",
    text: "We buy directly from growers across Sindh and Punjab, so farmers earn more and you pay less.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              Our Story
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Fresh Food,
              <br />
              <span className="text-brand-700">Happy Life.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              {BRAND.name} started with a simple frustration: grocery shopping
              in Karachi meant crowded markets, uncertain quality and hours
              lost in traffic. We believed the city deserved better — farm-fresh
              produce, honest prices and delivery you can set your watch by.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              Today we work directly with farmers, bakers and dairies across
              Pakistan, quality-check every item by hand, and deliver chilled
              to thousands of doorsteps every week.
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Shop Fresh Now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1000&q=80"
                alt="Fresh produce at a local market"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg sm:-left-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Sparkles size={20} />
              </span>
              <div>
                <p className="text-lg font-extrabold text-slate-900">100%</p>
                <p className="text-xs text-slate-500">Freshness promise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold text-brand-700 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              What We Stand For
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Four promises behind every order we pack.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-extrabold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-center gap-8 rounded-3xl bg-brand-900 p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              <Users size={15} />
              Join the family
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Karachi shops with us every day. Come see why.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Get 10% off your first order with code{" "}
              <span className="font-bold text-amber-300">WELCOME</span>, plus
              free delivery on orders over Rs 2,000.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-900 transition hover:bg-brand-50"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
              alt="Fresh groceries ready for delivery"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
