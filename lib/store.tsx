"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BRAND, getProduct } from "./data";

export interface CartItem {
  slug: string;
  qty: number;
}

export interface OrderItem {
  slug: string;
  qty: number;
  price: number;
}

export type OrderStatus = "Placed" | "Packed" | "Out for Delivery" | "Delivered";

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  slot: string;
  payment: string;
  status: OrderStatus;
  placedAt: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface CheckoutData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  slot: string;
  payment: string;
}

const COUPONS: Record<string, { label: string }> = {
  WELCOME: { label: "10% off up to Rs 500" },
  FREESHIP: { label: "Free delivery" },
};

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — ignore
  }
}

interface StoreValue {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discount: number;
  deliveryFee: number;
  cartTotal: number;
  coupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (slug: string, qty?: number) => void;
  updateQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  orders: Order[];
  placeOrder: (data: CheckoutData) => string;
  getOrder: (id: string) => Order | undefined;
  user: UserProfile;
  updateProfile: (u: UserProfile) => void;
  addresses: Address[];
  addAddress: (a: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readLS("tazamart-cart", []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readLS("tazamart-wishlist", [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readLS("tazamart-orders", [])
  );
  const [user, setUser] = useState<UserProfile>(() =>
    readLS("tazamart-user", { name: "", email: "", phone: "" })
  );
  const [addresses, setAddresses] = useState<Address[]>(() =>
    readLS("tazamart-addresses", [])
  );
  const [coupon, setCoupon] = useState<string | null>(() =>
    readLS("tazamart-coupon", null)
  );
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => writeLS("tazamart-cart", cart), [cart]);
  useEffect(() => writeLS("tazamart-wishlist", wishlist), [wishlist]);
  useEffect(() => writeLS("tazamart-orders", orders), [orders]);
  useEffect(() => writeLS("tazamart-user", user), [user]);
  useEffect(() => writeLS("tazamart-addresses", addresses), [addresses]);
  useEffect(() => writeLS("tazamart-coupon", coupon), [coupon]);

  const addToCart = useCallback((slug: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: Math.min(i.qty + qty, 99) } : i
        );
      }
      return [...prev, { slug, qty: Math.min(qty, 99) }];
    });
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i))
    );
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const p = getProduct(i.slug);
        return sum + (p ? p.price * i.qty : 0);
      }, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart]
  );

  const discount = useMemo(() => {
    if (coupon === "WELCOME") return Math.min(cartSubtotal * 0.1, 500);
    return 0;
  }, [coupon, cartSubtotal]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (coupon === "FREESHIP") return 0;
    return cartSubtotal - discount >= BRAND.freeDeliveryThreshold
      ? 0
      : BRAND.deliveryFee;
  }, [coupon, cartSubtotal, discount, cart.length]);

  const cartTotal = useMemo(
    () => Math.max(0, cartSubtotal - discount + deliveryFee),
    [cartSubtotal, discount, deliveryFee]
  );

  const applyCoupon = useCallback(
    (code: string) => {
      const normalized = code.trim().toUpperCase();
      if (COUPONS[normalized]) {
        setCoupon(normalized);
        return true;
      }
      return false;
    },
    []
  );

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const placeOrder = useCallback(
    (data: CheckoutData): string => {
      const id = `TM-${Math.floor(100000 + Math.random() * 900000)}`;
      const items: OrderItem[] = cart.map((i) => ({
        slug: i.slug,
        qty: i.qty,
        price: getProduct(i.slug)?.price ?? 0,
      }));
      const order: Order = {
        id,
        items,
        subtotal: cartSubtotal,
        discount,
        delivery: deliveryFee,
        total: cartTotal,
        status: "Placed",
        placedAt: Date.now(),
        ...data,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCoupon(null);
      return id;
    },
    [cart, cartSubtotal, discount, deliveryFee, cartTotal]
  );

  const getOrder = useCallback(
    (id: string) => orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase()),
    [orders]
  );

  const updateProfile = useCallback((u: UserProfile) => setUser(u), []);

  const addAddress = useCallback((a: Omit<Address, "id">) => {
    const id = `addr-${Date.now()}`;
    setAddresses((prev) => [...prev, { ...a, id }]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value: StoreValue = {
    cart,
    cartCount,
    cartSubtotal,
    discount,
    deliveryFee,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
    orders,
    placeOrder,
    getOrder,
    user,
    updateProfile,
    addresses,
    addAddress,
    removeAddress,
    cartOpen,
    setCartOpen,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const couponLabel = (code: string): string =>
  COUPONS[code]?.label ?? code;
