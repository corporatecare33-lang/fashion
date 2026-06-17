import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/deals")({
  component: DealsPage,
  head: () => ({
    meta: [
      { title: "Deals & Offers — NOORÉVA" },
      { name: "description", content: "Discounts and limited-time offers on NOORÉVA modest fashion." },
    ],
  }),
});

function DealsPage() {
  const deals = products.filter((p) => p.oldPrice > p.price);
  return (
    <div className="container-luxe py-10">
      <div className="rounded-md px-6 py-5 mb-6 bg-gradient-to-r from-gold/20 to-gold/5 border border-gold/30">
        <h1 className="font-display text-3xl text-gold-dark">Deals & Offers</h1>
        <p className="text-sm text-muted-foreground mt-1">Save up to 30% on selected styles.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}