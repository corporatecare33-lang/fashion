import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findCategory, productsByCategorySlug, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = findCategory(params.slug);
    if (!cat) throw notFound();
    return { cat, items: productsByCategorySlug(params.slug) };
  },
  component: CategoryPage,
  notFoundComponent: () => <div className="container-luxe py-20 text-center">Category not found.</div>,
  errorComponent: () => <div className="container-luxe py-20 text-center">Something went wrong.</div>,
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.name} — NOORÉVA` },
      { name: "description", content: `Shop ${loaderData.cat.name} at NOORÉVA.` },
    ] : [],
  }),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData() as { cat: { name: string; slug: string; image: string }; items: Product[] };
  return (
    <div className="container-luxe py-10">
      <nav className="text-xs text-muted-foreground mb-3">
        <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/categories" className="hover:text-gold">Categories</Link> / <span>{cat.name}</span>
      </nav>
      <div className="rounded-md overflow-hidden mb-6 relative aspect-[4/1] bg-secondary">
        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent flex items-center px-6 md:px-12">
          <h1 className="font-display text-3xl md:text-5xl text-background">{cat.name}</h1>
        </div>
      </div>
      {items.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">No products available in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </div>
  );
}