"use client";

import { Minus, Plus } from "lucide-react";

export default function QtyStepper({
  value,
  onChange,
  small = false,
}: {
  value: number;
  onChange: (v: number) => void;
  small?: boolean;
}) {
  const btn = small
    ? "h-7 w-7"
    : "h-9 w-9";
  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white ${
        small ? "p-0.5" : "p-1"
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className={`${btn} inline-flex items-center justify-center rounded-full text-slate-500 transition hover:bg-brand-50 hover:text-brand-700`}
      >
        <Minus size={small ? 13 : 15} />
      </button>
      <span
        className={`min-w-8 text-center font-semibold tabular-nums text-slate-800 ${
          small ? "text-xs" : "text-sm"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={`${btn} inline-flex items-center justify-center rounded-full text-slate-500 transition hover:bg-brand-50 hover:text-brand-700`}
      >
        <Plus size={small ? 13 : 15} />
      </button>
    </div>
  );
}
