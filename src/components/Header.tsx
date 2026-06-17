import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, Package, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useCart } from "@/lib/cart-store";
import { searchProducts, categories } from "@/lib/products";

type NavItem = { to: string; label: string; hasDropdown?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/deals", label: "Deal & Offers" },
  { to: "/categories", label: "Categories", hasDropdown: true },
  { to: "/contact", label: "Contact us" },
  { to: "/about", label: "About us" },
  { to: "/track-order", label: "Track Order" },
];

function SearchBox({ onPick }: { onPick?: () => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const results = useMemo(() => searchProducts(q), [q]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            navigate({ to: "/shop", search: { q } as never });
            setOpen(false);
            onPick?.();
          }
        }}
        placeholder="Type to start searching..."
        className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-input bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-gold/40"
      />
      {open && q.trim() && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-luxe max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No products found.</div>
          ) : (
            results.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                onClick={() => { setOpen(false); setQ(""); onPick?.(); }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-secondary transition"
              >
                <img src={p.image} alt="" className="w-10 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{p.title}</p>
                  <p className="text-xs text-gold-dark">{p.price.toLocaleString()}৳</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const count = useCart((s) => s.count());
  const subtotal = useCart((s) => s.subtotal());
  const openDrawer = useCart((s) => s.openDrawer);
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md">
      <div className="container-luxe flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="NOORÉVA — Home">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-[0.18em] text-background bg-clip-text">
            <span className="text-foreground">NOOR</span><span className="text-gold">ÉVA</span>
          </span>
        </Link>
        <div className="hidden md:flex flex-1 items-center">
          <SearchBox />
        </div>
        <Link to="/track-order" className="hidden lg:inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:border-gold transition whitespace-nowrap">
          <Package className="h-4 w-4" /> Track order
        </Link>
        <button
          onClick={openDrawer}
          className="relative inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:border-gold transition ml-auto md:ml-0"
        >
          <span className="hidden md:inline">{subtotal.toLocaleString()}৳</span>
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gold text-foreground text-[10px] font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
              {count}
            </span>
          )}
        </button>
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 border border-border rounded-md hover:border-gold transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <nav className="hidden md:block relative container-luxe">
        <div className="bg-background/25 backdrop-blur-xl text-foreground rounded-md flex items-stretch text-xs lg:text-sm border border-foreground/15 shadow-luxe">
          {nav.map((n, idx) => (
            <div
              key={n.label}
              className="relative"
              onMouseEnter={() => n.hasDropdown && setCatOpen(true)}
              onMouseLeave={() => n.hasDropdown && setCatOpen(false)}
            >
              {n.hasDropdown ? (
                <button
                  type="button"
                  onClick={() => setCatOpen((o) => !o)}
                  aria-expanded={catOpen}
                  aria-haspopup="menu"
                  className={`px-3 lg:px-5 py-3 inline-flex items-center gap-1.5 font-medium whitespace-nowrap hover:text-gold transition-colors ${catOpen ? "text-gold" : ""}`}
                >
                  {n.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  to={n.to as never}
                  className={`px-3 lg:px-5 py-3 inline-flex items-center gap-1.5 font-medium whitespace-nowrap hover:text-gold transition-colors`}
                  activeProps={{ className: "text-gold" }}
                >
                  {n.label}
                </Link>
              )}
              {n.hasDropdown && catOpen && (
                <div className="absolute left-0 top-full min-w-[220px] bg-background text-foreground border border-border shadow-luxe rounded-b-md overflow-hidden z-50">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setCatOpen(false)}
                      className="block px-5 py-3 text-sm font-medium uppercase tracking-wide border-b border-border last:border-b-0 hover:bg-gold/10 hover:text-gold-dark transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="https://wa.me/8801337018777"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 bg-emerald-600 text-white px-3 lg:px-5 my-1.5 mr-1 rounded-md text-xs lg:text-sm hover:opacity-90 transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-4 w-4" /> <span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-luxe py-3 flex flex-col gap-2">
            <SearchBox onPick={() => setOpen(false)} />
            {nav.map((n) => (
              n.hasDropdown ? (
                <div key={n.label}>
                  <button
                    type="button"
                    onClick={() => setCatOpen((o) => !o)}
                    className="w-full flex items-center justify-between py-2 text-sm font-medium"
                  >
                    {n.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
                  </button>
                  {catOpen && (
                    <div className="pl-3 border-l border-border ml-1 flex flex-col">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to="/category/$slug"
                          params={{ slug: c.slug }}
                          onClick={() => { setOpen(false); setCatOpen(false); }}
                          className="py-1.5 text-sm text-muted-foreground hover:text-gold uppercase tracking-wide"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.label} to={n.to as never} onClick={() => setOpen(false)} className="py-2 text-sm">
                  {n.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}