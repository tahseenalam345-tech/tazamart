import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Shopping Cart – TazaMart",
  description: "Review your cart and proceed to checkout. Fresh groceries delivered across Karachi.",
};

export default function CartPage() {
  return <CartClient />;
}
