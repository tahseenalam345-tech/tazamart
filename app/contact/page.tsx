import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BRAND } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact Us – TazaMart",
  description:
    "Get in touch with TazaMart. Call, email or send us a message — we reply within 24 hours.",
};

const infoCards = [
  {
    icon: Phone,
    title: "Call Us",
    lines: [BRAND.phone],
    text: "Mon–Sun, 9 AM – 10 PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [BRAND.email],
    text: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [BRAND.address],
    text: "Head office & packing facility",
  },
  {
    icon: Clock,
    title: "Delivery Hours",
    lines: ["9:00 AM – 10:00 PM"],
    text: "Seven days a week",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
          Questions about an order, a product, or partnering with us? We&apos;d
          love to hear from you.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {infoCards.map(({ icon: Icon, title, lines, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <Icon size={22} />
            </span>
            <h3 className="mt-4 font-extrabold text-slate-900">{title}</h3>
            {lines.map((l) => (
              <p key={l} className="mt-1 text-sm font-semibold text-brand-700">
                {l}
              </p>
            ))}
            <p className="mt-1 text-xs text-slate-400">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
