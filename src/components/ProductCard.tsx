import { Link, useNavigate } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
  const add = useCart((s) => s.add);
  const navigate = useNavigate();
  return (
    <div
      className={`group flex flex-col rounded-md overflow-hidden border ${dark ? "border-white/10 bg-[oklch(0.16_0.01_60)] text-background" : "border-border bg-card"} shadow-card hover:shadow-luxe transition-all duration-300`}
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block overflow-hidden">
        <div className="aspect-[3/4] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            width={768}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className={`text-xs md:text-sm font-semibold uppercase tracking-wide line-clamp-2 hover:text-gold transition ${dark ? "text-gold" : ""}`}
        >
          {product.title}
        </Link>
        <div className="flex items-baseline gap-2 mt-auto">
          <span className={`text-xs line-through ${dark ? "text-background/50" : "text-muted-foreground"}`}>
            {product.oldPrice.toLocaleString()}৳
          </span>
          <span className="font-bold underline underline-offset-2">{product.price.toLocaleString()}৳</span>
        </div>
        <button
          onClick={() => {
            add(product);
            navigate({ to: "/checkout" });
          }}
          className="mt-2 inline-flex items-center justify-center gap-2 bg-foreground text-background py-2.5 text-xs font-medium uppercase tracking-wider hover:bg-gold hover:text-foreground transition"
        >
          <Zap className="h-3.5 w-3.5" /> Buy Now
        </button>
      </div>
    </div>
  );
}