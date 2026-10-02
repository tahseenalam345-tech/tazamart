"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Which areas do you deliver to?",
    a: "We currently deliver across Karachi — DHA, Clifton, Gulshan, North Nazimabad, Bahria Town, Malir and 30+ other areas. At checkout, select your city and we'll confirm the exact slot for your address.",
  },
  {
    q: "How much is the delivery fee?",
    a: "Delivery is a flat Rs 150. It's completely free on all orders over Rs 2,000, and the FREESHIP coupon gives you free delivery on any order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on Delivery, debit/credit cards (Visa, Mastercard, UnionPay) and direct bank transfer. Card payments are processed over a secure, encrypted connection.",
  },
  {
    q: "What if something arrives damaged or not fresh?",
    a: "Tell us within 24 hours with a photo and we'll replace the item or refund you — no lengthy forms, no arguments. Freshness is our promise.",
  },
  {
    q: "Can I choose a delivery time slot?",
    a: "Yes. At checkout you can pick from same-day and next-day slots, including evening deliveries for working households.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border transition ${
              isOpen
                ? "border-brand-200 bg-white shadow-sm"
                : "border-slate-100 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-bold text-slate-900">{f.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-brand-600 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
