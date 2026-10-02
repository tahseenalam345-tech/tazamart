"use client";

import { useEffect, useState } from "react";

function timeToMidnight(): { h: number; m: number; s: number } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownTimer({ dark = false }: { dark?: boolean }) {
  const [t, setT] = useState(timeToMidnight);

  useEffect(() => {
    const id = setInterval(() => setT(timeToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: pad(t.h), label: "Hrs" },
    { value: pad(t.m), label: "Min" },
    { value: pad(t.s), label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`inline-flex min-w-11 items-center justify-center rounded-lg px-2 py-1.5 text-sm font-extrabold tabular-nums ${
                dark
                  ? "bg-white/15 text-white"
                  : "bg-brand-600 text-white"
              }`}
            >
              {u.value}
            </span>
            <span
              className={`mt-1 text-[10px] font-medium uppercase tracking-wide ${
                dark ? "text-white/70" : "text-slate-500"
              }`}
            >
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className={`-mt-5 text-lg font-bold ${
                dark ? "text-white/60" : "text-slate-300"
              }`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
