"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ClipboardList,
  Package,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";
import { useStore, type Order } from "@/lib/store";
import { formatRs, getProduct } from "@/lib/data";

const stages = [
  { label: "Order Placed", text: "We've received your order", icon: ClipboardList },
  { label: "Packed", text: "Your items are being packed", icon: Package },
  { label: "Out for Delivery", text: "The rider is on the way", icon: Truck },
  { label: "Delivered", text: "Enjoy your fresh groceries", icon: PackageCheck },
];

function stageIndexFor(placedAt: number): number {
  const ageMin = (Date.now() - placedAt) / 60000;
  if (ageMin >= 360) return 3;
  if (ageMin >= 120) return 2;
  if (ageMin >= 30) return 1;
  return 0;
}

const DEMO_PLACED_AT = Date.now() - 45 * 60000;

function Timeline({ current }: { current: number }) {
  return (
    <div className="mt-6">
      {stages.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const Icon = s.icon;
        return (
          <div key={s.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                  done
                    ? "bg-brand-600 text-white"
                    : active
                      ? "bg-brand-600 text-white ring-4 ring-brand-100"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </span>
              {i < stages.length - 1 && (
                <span
                  className={`my-1 w-0.5 flex-1 rounded-full ${
                    done ? "bg-brand-600" : "bg-slate-200"
                  }`}
                  style={{ minHeight: 28 }}
                />
              )}
            </div>
            <div className="pb-8">
              <p
                className={`text-sm font-bold ${
                  done || active ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {s.label}
                {active && (
                  <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-bold text-brand-700">
                    Current
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500">{s.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderResult({ order, demo }: { order: Order; demo: boolean }) {
  const current = useMemo(
    () => stageIndexFor(order.placedAt),
    [order.placedAt]
  );
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Order ID
            </p>
            <p className="text-xl font-extrabold text-slate-900">{order.id}</p>
          </div>
          <span className="rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-bold text-brand-700">
            {stages[current].label}
          </span>
        </div>
        {demo && (
          <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2.5 text-xs text-amber-700">
            Demo preview — this order ID isn&apos;t in your history, so
            we&apos;re showing a sample timeline.
          </p>
        )}
        <Timeline current={current} />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
          Order Details
        </h3>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => {
            const p = getProduct(item.slug);
            return (
              <div key={item.slug} className="flex items-center gap-3">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-mist">
                  {p && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  )}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {p?.name ?? item.slug}
                  </p>
                  <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {formatRs(item.price * item.qty)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatRs(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-brand-700">
              <span>Discount</span>
              <span>−{formatRs(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-600">
            <span>Delivery</span>
            <span>{order.delivery === 0 ? "Free" : formatRs(order.delivery)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-slate-900">
            <span>Total</span>
            <span>{formatRs(order.total)}</span>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-mist p-4 text-xs leading-relaxed text-slate-600">
          <p className="font-semibold text-slate-800">
            {order.name} · {order.phone}
          </p>
          <p>
            {order.address}, {order.city}
          </p>
          <p className="mt-1">
            {order.slot} · {order.payment}
          </p>
        </div>
      </div>
    </div>
  );
}

function TrackContent() {
  const searchParams = useSearchParams();
  const { getOrder, orders } = useStore();
  const [input, setInput] = useState(searchParams.get("id") ?? "");
  const [searched, setSearched] = useState<string | null>(
    searchParams.get("id") ?? null
  );

  const result = useMemo(() => {
    if (!searched) return null;
    const found = getOrder(searched);
    if (found) return { order: found, demo: false };
    if (/^TM-\d{6}$/i.test(searched.trim())) {
      // Demo timeline for well-formed but unknown IDs
      return {
        order: {
          id: searched.trim().toUpperCase(),
          items: [
            { slug: "fresh-bananas", qty: 2, price: 180 },
            { slug: "fresh-milk", qty: 2, price: 220 },
            { slug: "brown-bread", qty: 1, price: 180 },
          ],
          subtotal: 980,
          discount: 98,
          delivery: 150,
          total: 1032,
          name: "Demo Customer",
          phone: "0300 0000000",
          email: "",
          address: "Demo Street",
          city: "Karachi",
          notes: "",
          slot: "Today · 4:00 – 6:00 PM",
          payment: "Cash on Delivery",
          status: "Placed" as const,
          placedAt: DEMO_PLACED_AT,
        } satisfies Order,
        demo: true,
      };
    }
    return "not-found" as const;
  }, [searched, getOrder]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Package size={26} />
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
          Track Your Order
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Enter your order ID (e.g. TM-123456) to see live updates on your
          delivery.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(input.trim() || null);
          }}
          className="mx-auto mt-6 flex max-w-md gap-2"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="TM-123456"
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm uppercase outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Track
          </button>
        </form>
      </div>

      {result === "not-found" && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Circle size={24} />
          </span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Order not found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find an order with ID{" "}
            <span className="font-mono font-semibold">{searched}</span>. Double
            check the ID from your confirmation screen.
          </p>
        </div>
      )}

      {result && result !== "not-found" && (
        <OrderResult order={result.order} demo={result.demo} />
      )}

      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            Recent Orders
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setInput(o.id);
                  setSearched(o.id);
                }}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-sm font-bold text-slate-900">
                    {o.id}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(o.placedAt).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {o.items.reduce((s, i) => s + i.qty, 0)} items ·{" "}
                    {formatRs(o.total)}
                  </p>
                </div>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                  {stages[stageIndexFor(o.placedAt)].label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {!searched && orders.length === 0 && (
        <div className="mx-auto mt-10 max-w-md text-center">
          <p className="text-sm text-slate-500">
            No orders yet.{" "}
            <Link href="/shop" className="font-semibold text-brand-700 hover:underline">
              Start shopping
            </Link>{" "}
            and your orders will appear here.
          </p>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-sm text-slate-500">
          Loading...
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}
