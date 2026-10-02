"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Landmark,
  MapPin,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useStore, type CheckoutData } from "@/lib/store";
import { formatRs, getProduct } from "@/lib/data";
import EmptyState from "@/components/EmptyState";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

const slots = [
  "Today · 4:00 – 6:00 PM",
  "Today · 6:00 – 8:00 PM",
  "Tomorrow · 9:00 – 11:00 AM",
  "Tomorrow · 2:00 – 4:00 PM",
];

const payments = [
  { id: "cod", label: "Cash on Delivery", text: "Pay in cash when your order arrives", icon: Banknote },
  { id: "card", label: "Debit / Credit Card", text: "Visa, Mastercard, UnionPay", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", text: "IBFT to our account before delivery", icon: Landmark },
];

const steps = ["Details", "Delivery & Payment", "Review"];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    discount,
    deliveryFee,
    cartTotal,
    coupon,
    user,
    placeOrder,
  } = useStore();

  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: "",
    city: "Karachi",
    notes: "",
  });
  const [slot, setSlot] = useState(slots[0]);
  const [payment, setPayment] = useState("cod");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Please enter your full name.";
    if (!/^(\+92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, "")))
      e.phone = "Enter a valid Pakistani mobile number (e.g. 03001234567).";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "That email doesn't look right.";
    if (form.address.trim().length < 10)
      e.address = "Please enter your complete street address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const place = () => {
    const data: CheckoutData = {
      ...form,
      slot,
      payment: payments.find((p) => p.id === payment)?.label ?? payment,
    };
    const id = placeOrder(data);
    setOrderId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Success screen ───
  if (orderId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 size={40} />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Order placed successfully
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Thank you, {form.name.split(" ")[0] || "friend"}. Your groceries are
          being packed and will arrive during{" "}
          <span className="font-semibold text-slate-700">{slot}</span>. We&apos;ll
          send updates to {form.phone}.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Order ID
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-brand-700">
            {orderId}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Total paid: <span className="font-bold text-slate-900">{formatRs(cartTotal)}</span>
            {" "}· {payments.find((p) => p.id === payment)?.label}
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/track-order?id=${orderId}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Package size={16} />
            Track Your Order
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-600 px-7 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <EmptyState
          icon={ShoppingCart}
          title="Nothing to check out"
          message="Your cart is empty. Add some fresh groceries first, then come back to complete your order."
          actionLabel="Browse Products"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Checkout
      </h1>

      {/* Step indicator */}
      <div className="mt-6 flex items-center gap-2 sm:gap-4">
        {steps.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex flex-1 items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                    done
                      ? "bg-brand-600 text-white"
                      : active
                        ? "bg-brand-600 text-white ring-4 ring-brand-100"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? <CheckCircle2 size={18} /> : n}
                </span>
                <span
                  className={`hidden text-sm font-semibold sm:inline ${
                    active || done ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {n < steps.length && (
                <span
                  className={`h-0.5 flex-1 rounded-full ${
                    done ? "bg-brand-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* ─── Step 1: details ─── */}
          {step === 1 && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold text-slate-900">
                Contact & Address
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Full Name *
                  </label>
                  <input value={form.name} onChange={set("name")} placeholder="e.g. Ahmed Raza" className={inputCls} />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone *
                  </label>
                  <input value={form.phone} onChange={set("phone")} placeholder="0300 1234567" className={inputCls} />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Street Address *
                  </label>
                  <input value={form.address} onChange={set("address")} placeholder="House, street, area..." className={inputCls} />
                  {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    City *
                  </label>
                  <select value={form.city} onChange={set("city")} className={inputCls}>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Order Notes <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input value={form.notes} onChange={set("notes")} placeholder="Gate code, landmark..." className={inputCls} />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => validateStep1() && setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 2: slot + payment ─── */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  <Truck size={19} className="text-brand-600" />
                  Delivery Slot
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
                        slot === s
                          ? "border-brand-600 bg-brand-50 text-brand-800"
                          : "border-slate-200 text-slate-600 hover:border-brand-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                  <CreditCard size={19} className="text-brand-600" />
                  Payment Method
                </h2>
                <div className="mt-4 space-y-3">
                  {payments.map(({ id, label, text, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setPayment(id)}
                      className={`flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left transition ${
                        payment === id
                          ? "border-brand-600 bg-brand-50"
                          : "border-slate-200 hover:border-brand-300"
                      }`}
                    >
                      <span
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          payment === id
                            ? "bg-brand-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900">
                          {label}
                        </span>
                        <span className="block text-xs text-slate-500">{text}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="mt-5 grid gap-4 rounded-xl bg-mist p-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Card Number
                      </label>
                      <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="1234 5678 9012 3456" inputMode="numeric" className={inputCls} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Name on Card
                      </label>
                      <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="AHMED RAZA" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Expiry
                      </label>
                      <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        CVC
                      </label>
                      <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} placeholder="123" inputMode="numeric" className={inputCls} />
                    </div>
                    <p className="text-xs text-slate-400 sm:col-span-2">
                      This is a demo checkout — no real payment is processed.
                    </p>
                  </div>
                )}
                {payment === "bank" && (
                  <div className="mt-5 rounded-xl bg-mist p-5 text-sm text-slate-600">
                    <p className="font-semibold text-slate-800">Bank transfer details</p>
                    <p className="mt-1.5">
                      Account title: TazaMart (Pvt.) Ltd.
                      <br />
                      IBAN: PK36 TAZA 0000 1234 5678 9012
                      <br />
                      Please share your transaction receipt on WhatsApp after placing the order.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Review Order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ─── Step 3: review ─── */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Review Your Order
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-mist p-4">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <MapPin size={13} /> Deliver to
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{form.name}</p>
                    <p className="text-sm text-slate-600">{form.address}, {form.city}</p>
                    <p className="text-sm text-slate-600">{form.phone}</p>
                  </div>
                  <div className="rounded-xl bg-mist p-4">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">
                      <Truck size={13} /> Slot & Payment
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-slate-800">{slot}</p>
                    <p className="text-sm text-slate-600">
                      {payments.find((p) => p.id === payment)?.label}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {cart.map((item) => {
                    const p = getProduct(item.slug);
                    if (!p) return null;
                    return (
                      <div key={item.slug} className="flex items-center gap-3">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                          <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">
                            {item.qty} × {formatRs(p.price)}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-slate-900">
                          {formatRs(p.price * item.qty)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={place}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Place Order · {formatRs(cartTotal)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div>
          <div className="sticky top-40 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Summary</h2>
            <div className="mt-4 max-h-56 space-y-2.5 overflow-y-auto">
              {cart.map((item) => {
                const p = getProduct(item.slug);
                if (!p) return null;
                return (
                  <div key={item.slug} className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      {p.name} <span className="text-slate-400">× {item.qty}</span>
                    </span>
                    <span className="font-semibold">{formatRs(p.price * item.qty)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatRs(cartSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-700">
                  <span>Coupon ({coupon})</span>
                  <span className="font-semibold">−{formatRs(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? "Free" : formatRs(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-extrabold text-slate-900">
                <span>Total</span>
                <span>{formatRs(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
