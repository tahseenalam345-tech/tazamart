import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({
  title,
  subtitle,
  linkLabel,
  linkHref,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex items-end justify-between gap-4 ${
        centered ? "flex-col items-center text-center" : ""
      }`}
    >
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {linkLabel && linkHref && (
        <Link
          href={linkHref}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:gap-2.5 hover:text-brand-800"
        >
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
