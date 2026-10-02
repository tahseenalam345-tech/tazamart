import type { Metadata } from "next";
import WishlistClient from "@/components/WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist – TazaMart",
  description: "Your saved products on TazaMart.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
