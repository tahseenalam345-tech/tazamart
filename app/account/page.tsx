import type { Metadata } from "next";
import AccountClient from "@/components/AccountClient";

export const metadata: Metadata = {
  title: "My Account – TazaMart",
  description: "Manage your TazaMart profile, orders, wishlist and delivery addresses.",
};

export default function AccountPage() {
  return <AccountClient />;
}
