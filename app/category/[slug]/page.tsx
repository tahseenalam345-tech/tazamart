import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { categories, getCategory, productsByCategory } from "@/lib/data";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.name} – TazaMart`,
    description: `Shop ${category.name.toLowerCase()} online in Karachi. ${category.tagline}. Fresh Food, Happy Life.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        <Image
          src={category.image}
          alt={category.name}
          width={1600}
          height={400}
          className="h-52 w-full object-cover sm:h-64"
        />
        <div className="absolute inset-0 bg-brand-950/55" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
          <nav className="mb-3 flex items-center gap-1.5 text-xs font-medium text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="transition hover:text-white">
              Shop
            </Link>
            <ChevronRight size={13} />
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            {category.tagline} · {items.length} products
          </p>
        </div>
      </div>

      <ProductGrid products={items} />
    </div>
  );
}
