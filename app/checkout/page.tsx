import type { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout – TazaMart",
  description: "Complete your grocery order. Cash on delivery, cards and bank transfer accepted across Karachi.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
