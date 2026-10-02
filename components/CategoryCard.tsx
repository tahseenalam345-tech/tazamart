import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/data";
import { productsByCategory } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  const count = productsByCategory(category.slug).length;
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="relative mb-3 block h-20 w-20 overflow-hidden rounded-full bg-brand-50">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="80px"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </span>
      <span className="text-sm font-bold text-slate-900 transition group-hover:text-brand-700">
        {category.name}
      </span>
      <span className="mt-1 text-xs text-slate-400">{count} items</span>
    </Link>
  );
}
