import type { Metadata } from "next";
import TrackOrderClient from "@/components/TrackOrderClient";

export const metadata: Metadata = {
  title: "Track Your Order – TazaMart",
  description: "Track your TazaMart grocery order live — from packing to your doorstep.",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
