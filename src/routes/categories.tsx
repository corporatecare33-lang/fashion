import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "All Categories — NOORÉVA" },
      { name: "description", content: "Browse all NOORÉVA modest fashion categories." },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl mb-6">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-md border border-border bg-card shadow-card hover:shadow-luxe transition block">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="absolute bottom-0 inset-x-0 py-3 text-center text-sm font-semibold uppercase tracking-wider text-background bg-gradient-gold">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}