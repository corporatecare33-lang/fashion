import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { findProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-store";
import { Minus, Plus, MessageCircle, Phone, ShoppingCart, ZoomIn, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = findProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  notFoundComponent: () => <div className="container-luxe py-20 text-center">Product not found.</div>,
  errorComponent: () => <div className="container-luxe py-20 text-center">Something went wrong.</div>,
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.title} — NOORÉVA` },
      { name: "description", content: loaderData.product.description },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
});

function Countdown() {
  const [t, setT] = useState({ d: 1, h: 23, m: 53, s: 12 });
  useEffect(() => {
    const i = setInterval(() => {
      setT((x) => {
        let { d, h, m, s } = x;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="bg-foreground text-background rounded px-3 py-2 text-center min-w-[60px]">
      <div className="font-bold text-lg leading-tight">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{l}</div>
    </div>
  );
  return (
    <div className="flex gap-2">
      <Box v={t.d} l="Days" /><Box v={t.h} l="Hours" /><Box v={t.m} l="Minutes" /><Box v={t.s} l="Seconds" />
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [img, setImg] = useState(product.gallery[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [hoverZoom, setHoverZoom] = useState(false);
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const navigate = useNavigate();
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  useEffect(() => { setImg(product.gallery[0]); setQty(1); }, [product]);

  return (
    <div className="container-luxe py-6">
      <div className="grid md:grid-cols-2 gap-8 border border-border rounded-md p-4 md:p-6 bg-card">
        <div>
          <div
            className="relative aspect-[3/4] bg-secondary overflow-hidden rounded cursor-zoom-in"
            onMouseEnter={() => setHoverZoom(true)}
            onMouseLeave={() => setHoverZoom(false)}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            onClick={() => setZoom(true)}
          >
            <img
              src={img}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-200"
              style={hoverZoom ? { transform: "scale(2)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setZoom(true); }}
              aria-label="Zoom image"
              className="absolute top-3 right-3 p-2 bg-background/90 rounded-full shadow hover:bg-gold transition"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {product.gallery.map((g: string, i: number) => (
              <button key={i} onClick={() => setImg(g)} className={`aspect-square overflow-hidden rounded border ${img === g ? "border-gold" : "border-border"}`}>
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <nav className="text-xs text-muted-foreground mb-3">
            <Link to="/" className="hover:text-gold">Home</Link> / <span className="uppercase">{product.category}</span> / <span>{product.title}</span>
          </nav>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">{product.title}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-muted-foreground line-through">{product.oldPrice.toLocaleString()}৳</span>
            <span className="text-2xl font-bold text-gold-dark underline underline-offset-4">{product.price.toLocaleString()}৳</span>
          </div>
          <div className="text-gold mt-2 text-sm">★★★★★</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center border border-border rounded">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-secondary"><Minus className="h-4 w-4" /></button>
              <span className="px-5 font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-secondary"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => { add(product, qty); openDrawer(); toast.success("Added to cart"); }}
              className="bg-gold text-foreground font-semibold px-6 py-2.5 rounded hover:bg-gold-dark hover:text-background transition inline-flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
            <button
              onClick={() => { add(product, qty); navigate({ to: "/checkout" }); }}
              className="bg-foreground text-background font-semibold px-6 py-2.5 rounded hover:bg-gold hover:text-foreground transition"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <a className="bg-emerald-600 text-white text-sm rounded py-2.5 inline-flex items-center justify-center gap-2 hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp Order</a>
            <a className="bg-blue-700 text-white text-sm rounded py-2.5 inline-flex items-center justify-center gap-2 hover:opacity-90"><Phone className="h-4 w-4" /> Phone Order</a>
          </div>

          <div className="mt-5 rounded border border-gold/40 bg-gold/10 p-3 text-sm">
            <p className="font-semibold">Order without advance payment</p>
            <p className="text-xs text-muted-foreground mt-1">Cash on delivery available across Bangladesh — pay only when you receive.</p>
          </div>

          <div className="mt-5"><Countdown /></div>

          <div className="mt-5 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">SKU:</span> {product.sku} &nbsp; <span className="font-semibold text-foreground">Category:</span> {product.category}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="font-display text-2xl md:text-3xl underline decoration-gold underline-offset-8">Product Description</h2>
        <div className="mt-6 border border-dashed border-border rounded-md p-6 md:p-10 text-left max-w-3xl mx-auto bg-card">
          <p className="font-semibold">|| {product.title} ||</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
            <li>Premium soft cotton-feel cey fabric</li>
            <li>No pinning required — ready to wear design</li>
            <li>Length top to bottom: 58 inches</li>
            <li>Shoulder to hem: 71 inches</li>
            <li>Full back coverage, slightly longer in the back</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <div className="border border-border rounded-md p-4 bg-card text-center">
          <h3 className="font-display text-xl md:text-2xl font-semibold">Related Products</h3>
        </div>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Close zoom"
            className="absolute top-4 right-4 p-2 bg-background/90 rounded-full shadow hover:bg-gold transition"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={img} alt={product.title} className="max-h-[90vh] max-w-[90vw] object-contain rounded" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}