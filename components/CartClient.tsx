"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Tag, Trash2, X } from "lucide-react";
import { useStore, couponLabel } from "@/lib/store";
import { BRAND, formatRs, getProduct } from "@/lib/data";
import QtyStepper from "@/components/QtyStepper";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    cartSubtotal,
    discount,
    deliveryFee,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const apply = () => {
    if (!code.trim()) return;
    if (applyCoupon(code)) {
      setCode("");
      setError("");
    } else {
      setError("That code doesn't look right. Try WELCOME or FREESHIP.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Browse our fresh groceries and fill it up."
          actionLabel="Continue Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  const remaining = BRAND.freeDeliveryThreshold - (cartSubtotal - discount);
  const progress = Math.min(
    100,
    ((cartSubtotal - discount) / BRAND.freeDeliveryThreshold) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Shopping Cart
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {cart.reduce((s, i) => s + i.qty, 0)} items in your cart
      </p>

      {/* Free delivery progress */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        {remaining > 0 ? (
          <p className="text-sm text-slate-600">
            Add <span className="font-bold text-brand-700">{formatRs(remaining)}</span>{" "}
            more to unlock <span className="font-bold">free delivery</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-brand-700">
            You&apos;ve unlocked free delivery on this order.
          </p>
        )}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => {
            const p = getProduct(item.slug);
            if (!p) return null;
            return (
              <div
                key={item.slug}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <Link
                  href={`/product/${p.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-mist sm:h-28 sm:w-28"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/product/${p.slug}`}
                        className="font-bold text-slate-900 hover:text-brand-700"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-slate-400">
                        {p.unit} · {formatRs(p.price)} each
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${p.name}`}
                      onClick={() => removeFromCart(item.slug)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QtyStepper
                      value={item.qty}
                      onChange={(v) => updateQty(item.slug, v)}
                    />
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatRs(p.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
          >
            Continue shopping <ArrowRight size={15} />
          </Link>
        </div>

        {/* Summary */}
        <div>
          <div className="sticky top-40 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              Order Summary
            </h2>

            {/* Coupon */}
            {coupon ? (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <Tag size={15} />
                  {coupon} · {couponLabel(coupon)}
                </span>
                <button
                  type="button"
                  aria-label="Remove coupon"
                  onClick={removeCoupon}
                  className="text-brand-700/60 transition hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && apply()}
                    placeholder="Coupon code"
                    className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm uppercase outline-none transition placeholder:normal-case focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                  <button
                    type="button"
                    onClick={apply}
                    className="shrink-0 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-xs text-red-600">{error}</p>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  Try WELCOME for 10% off, or FREESHIP for free delivery.
                </p>
              </div>
            )}

            <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatRs(cartSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-brand-700">
                  <span>Coupon discount ({coupon})</span>
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

            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
