import Link from "next/link";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, categories } from "@/lib/data";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Deals", href: "/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "My Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                <Leaf size={22} />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-extrabold tracking-tight">
                  {BRAND.name}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-brand-300">
                  {BRAND.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Karachi&apos;s trusted online grocery store. Farm-fresh produce,
              pantry staples and daily essentials — delivered to your doorstep,
              on time, every time.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: XIcon, label: "X" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-brand-600 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-200">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-200">
              Categories
            </h4>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-brand-200">
              Get in Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-300" />
                {BRAND.phone}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-300" />
                {BRAND.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-300" />
                {BRAND.address}
              </li>
            </ul>
            <div className="mt-5 rounded-2xl bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">
                Delivery hours
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Monday – Sunday
                <br />
                9:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
