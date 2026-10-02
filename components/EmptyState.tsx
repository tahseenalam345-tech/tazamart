import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionHref,
}: {
  icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon size={28} />
      </span>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
