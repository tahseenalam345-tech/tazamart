"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Package,
  Plus,
  Trash2,
  User,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatRs, getProduct } from "@/lib/data";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AccountClient() {
  const {
    user,
    updateProfile,
    orders,
    wishlist,
    addresses,
    addAddress,
    removeAddress,
  } = useStore();

  const [tab, setTab] = useState<TabId>("profile");
  const [profile, setProfile] = useState(user);
  const [saved, setSaved] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "Home", address: "", city: "Karachi" });

  const saveProfile = () => {
    updateProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        My Account
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Manage your profile, orders, wishlist and delivery addresses.
      </p>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Tab nav */}
        <nav className="nice-scroll flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                tab === id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-700"
              }`}
            >
              <Icon size={17} />
              {label}
              {id === "orders" && orders.length > 0 && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    tab === id ? "bg-white/20 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {orders.length}
                </span>
              )}
              {id === "wishlist" && wishlist.length > 0 && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    tab === id ? "bg-white/20 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {wishlist.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex-1">
          {/* ─── Profile ─── */}
          {tab === "profile" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-extrabold text-slate-900">
                Profile Details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={saveProfile}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                {saved && <CheckCircle2 size={16} />}
                {saved ? "Saved" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ─── Orders ─── */}
          {tab === "orders" && (
            <div>
              {orders.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No orders yet"
                  message="Your order history will appear here once you place your first order."
                  actionLabel="Start Shopping"
                  actionHref="/shop"
                />
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-mono text-sm font-bold text-slate-900">
                            {o.id}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {new Date(o.placedAt).toLocaleString("en-PK", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}{" "}
                            · {o.items.reduce((s, i) => s + i.qty, 0)} items ·{" "}
                            {o.payment}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                            {o.status}
                          </span>
                          <span className="text-sm font-extrabold text-slate-900">
                            {formatRs(o.total)}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/track-order?id=${o.id}`}
                        className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
                      >
                        Track this order
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Wishlist ─── */}
          {tab === "wishlist" && (
            <div>
              {wishlist.length === 0 ? (
                <EmptyState
                  icon={Heart}
                  title="Wishlist is empty"
                  message="Tap the heart on any product to save it here for later."
                  actionLabel="Discover Products"
                  actionHref="/shop"
                />
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                  {wishlist.map((slug) => {
                    const p = getProduct(slug);
                    return p ? <ProductCard key={slug} product={p} /> : null;
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─── Addresses ─── */}
          {tab === "addresses" && (
            <div className="space-y-4">
              {addresses.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                          {a.label}
                        </span>
                        <button
                          type="button"
                          aria-label="Delete address"
                          onClick={() => removeAddress(a.id)}
                          className="text-slate-300 transition hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mt-3 text-sm text-slate-700">{a.address}</p>
                      <p className="text-sm text-slate-500">{a.city}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                  <Plus size={16} className="text-brand-600" />
                  Add New Address
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Label
                    </label>
                    <select
                      value={newAddr.label}
                      onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                      className={inputCls}
                    >
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      City
                    </label>
                    <input
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                      Street Address
                    </label>
                    <input
                      value={newAddr.address}
                      onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                      placeholder="House, street, area..."
                      className={inputCls}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={newAddr.address.trim().length < 5}
                  onClick={() => {
                    addAddress(newAddr);
                    setNewAddr({ label: "Home", address: "", city: "Karachi" });
                  }}
                  className="mt-4 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40"
                >
                  Save Address
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
