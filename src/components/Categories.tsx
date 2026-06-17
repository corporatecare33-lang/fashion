import { categories } from "@/lib/products";
import { Link } from "@tanstack/react-router";

export function Categories() {
  return (
    <section className="container-luxe mt-12">
      <div
        className="flex items-center justify-between rounded-t-md px-4 md:px-6 py-3 mb-3"
        style={{ background: "linear-gradient(to right, #f8f3e3 0%, #efe0a8 55%, #c9a14a 100%)" }}
      >
        <h2 className="font-display text-lg md:text-2xl font-bold uppercase tracking-wide text-foreground">Top Categories</h2>
        <Link to="/categories" className="text-[11px] md:text-xs px-3 md:px-4 py-2 bg-foreground text-background hover:bg-gold hover:text-foreground transition font-semibold rounded-sm">View all categories</Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((c) => (
          <Link key={c.name} to="/category/$slug" params={{ slug: c.slug }} className="group relative overflow-hidden rounded-md border border-border bg-card shadow-card hover:shadow-luxe transition block">
            <div className="aspect-square overflow-hidden">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="absolute bottom-0 inset-x-0 py-1.5 px-1 text-center text-[8px] md:text-[11px] font-semibold uppercase tracking-wider text-background bg-gradient-gold whitespace-nowrap">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}