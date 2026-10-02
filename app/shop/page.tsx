import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Products – TazaMart",
  description:
    "Browse the full TazaMart catalogue: fruits, vegetables, dairy, bakery, meat, pantry staples and more, delivered in Karachi.",
};

export default function ShopPage() {
  return <ShopClient />;
}
