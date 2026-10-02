"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatRs, getProduct } from "@/lib/data";
import QtyStepper from "./QtyStepper";
import EmptyState from "./EmptyState";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    cartSubtotal,
    discount,
    deliveryFee,
    cartTotal,
  } = useStore();

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <ShoppingCart size={20} className="text-brand-600" />
            Your Cart
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-700">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 overflow-y-auto p-5">
            <EmptyState
              icon={ShoppingCart}
              title="Your cart is empty"
              message="Looks like you haven't added anything yet. Browse our fresh groceries and fill it up."
              actionLabel="Start Shopping"
              actionHref="/shop"
            />
          </div>
        ) : (
          <>
            <div className="nice-scroll flex-1 space-y-3 overflow-y-auto p-5">
              {cart.map((item) => {
                const p = getProduct(item.slug);
                if (!p) return null;
                return (
                  <div
                    key={item.slug}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                  >
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-mist"
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="line-clamp-1 text-sm font-bold text-slate-900 hover:text-brand-700"
                          >
                            {p.name}
                          </Link>
                          <p className="text-xs text-slate-400">
                            {p.unit} · {formatRs(p.price)}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${p.name}`}
                          onClick={() => removeFromCart(item.slug)}
                          className="text-slate-300 transition hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QtyStepper
                          small
                          value={item.qty}
                          onChange={(v) => updateQty(item.slug, v)}
                        />
                        <span className="text-sm font-extrabold text-slate-900">
                          {formatRs(p.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-2 border-t border-slate-100 bg-mist/60 px-5 py-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatRs(cartSubtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-brand-700">
                  <span>Coupon discount</span>
                  <span className="font-semibold">−{formatRs(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? "Free" : formatRs(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-extrabold text-slate-900">
                <span>Total</span>
                <span>{formatRs(cartTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border-2 border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
