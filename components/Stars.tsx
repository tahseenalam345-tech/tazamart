import { Star } from "lucide-react";

export default function Stars({
  rating,
  size = 14,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 0.75;
        const half = !filled && rating >= i + 0.25;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "fill-amber-400 text-amber-400"
                : half
                  ? "fill-amber-200 text-amber-400"
                  : "fill-slate-200 text-slate-200"
            }
          />
        );
      })}
    </span>
  );
}
