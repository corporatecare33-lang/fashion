import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, searchProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Shop — NOORÉVA" },
      { name: "description", content: "Browse all NOORÉVA modest fashion products." },
    ],
  }),
});

const ALL_CATEGORIES: Product["category"][] = ["Salat Khimar", "Hijab", "Abaya Gown"];
const PRICE_MIN = 0;
const PRICE_MAX = 5000;
type SortKey = "featured" | "price-asc" | "price-desc" | "discount";

function ShopPage() {
  const { q } = Route.useSearch();
  const base = q ? searchProducts(q) : products;

  const [selectedCats, setSelectedCats] = useState<Product["category"][]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [open, setOpen] = useState(false);

  const toggleCat = (c: Product["category"]) =>
    setSelectedCats((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const clearAll = () => {
    setSelectedCats([]);
    setMaxPrice(PRICE_MAX);
    setOnlyDiscount(false);
    setSort("featured");
  };

  const list = useMemo(() => {
    let out = base.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (onlyDiscount && p.oldPrice <= p.price) return false;
      return true;
    });
    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    else if (sort === "discount")
      out = [...out].sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price));
    return out;
  }, [base, selectedCats, maxPrice, onlyDiscount, sort]);

  const activeCount =
    selectedCats.length + (maxPrice < PRICE_MAX ? 1 : 0) + (onlyDiscount ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-gold underline underline-offset-2">
            Clear all
          </button>
        )}
      </div>

      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {ALL_CATEGORIES.map((c) => {
            const count = base.filter((p) => p.category === c).length;
            return (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer text-sm group">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(c)}
                  onChange={() => toggleCat(c)}
                  className="h-4 w-4 accent-gold"
                />
                <span className="flex-1 group-hover:text-gold-dark transition">{c}</span>
                <span className="text-xs text-muted-foreground">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Max price
        </h3>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>৳0</span>
          <span className="text-foreground font-medium">Up to ৳{maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2.5 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={onlyDiscount}
            onChange={(e) => setOnlyDiscount(e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          <span>Discounted only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl mb-2">
        {q ? `Search results for "${q}"` : "Shop"}
      </h1>
      <p className="text-muted-foreground mb-6">{list.length} products</p>

      <div className="flex md:hidden items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-md text-sm hover:border-gold transition"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeCount > 0 && <span className="text-gold">({activeCount})</span>}
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block sticky top-24 self-start border border-border rounded-md p-5 bg-card">
          {FilterPanel}
        </aside>

        <div>
          <div className="hidden md:flex items-center justify-end mb-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {list.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-md">
              <p className="text-muted-foreground mb-3">No products match these filters.</p>
              <button onClick={clearAll} className="text-gold underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {list.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setOpen(false)}
              className="mt-7 w-full bg-foreground text-background py-3 rounded-md uppercase tracking-wider text-sm"
            >
              Show {list.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}