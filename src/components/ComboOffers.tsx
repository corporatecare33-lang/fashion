import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { findProduct } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

const combos = [
  {
    tag: "Save ৳450",
    title: "Salat Khimar + 2 Hijab",
    desc: "1 ta Nida khimar + 2 ta Korean chiffon hijab — daily namaz + out-door, dui kaaj-e cholbe.",
    price: 1990,
    original: 2440,
    slugs: ["salat-khimar-sk-16", "amirah-hijab-gt-2161", "amirah-hijab-gt-2168"],
  },
  {
    tag: "Save ৳700",
    title: "Abaya Gown + Matching Hijab",
    desc: "Premium nida abaya er sathe contrast hijab free — wedding, dawat ba bairir jonno ready set.",
    price: 2890,
    original: 3590,
    slugs: ["anika-maham-gown-gt-1499", "amirah-hijab-gt-2159"],
  },
  {
    tag: "Eid Special",
    title: "Mother & Daughter Combo",
    desc: "Ma-mehe-r jonno matching abaya + khimar — Eid morning er chobi-r jonno perfect set.",
    price: 3490,
    original: 4290,
    slugs: ["anika-cape-gown-gt-1513", "salat-khimar-sk-19"],
  },
];

export function ComboOffers() {
  const navigate = useNavigate();
  const add = useCart((s) => s.add);

  const handleOrder = (slugs: string[], title: string) => {
    const products = slugs.map(findProduct).filter((p): p is NonNullable<typeof p> => !!p);
    if (products.length === 0) {
      toast.error("Combo unavailable");
      return;
    }
    products.forEach((p) => add(p, 1));
    toast.success(`${title} added to cart`);
    navigate({ to: "/checkout" });
  };

  return (
    <section className="container-luxe mt-16">
      <div className="text-center mb-8">
        <span className="text-[11px] tracking-[0.25em] uppercase text-gold">Bundle & save</span>
        <h2 className="font-display text-3xl md:text-4xl mt-2">Combo Offers</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {combos.map((c) => (
          <article
            key={c.title}
            className="group rounded-md border border-border bg-card overflow-hidden flex flex-col hover:border-gold hover:shadow-luxe transition-all"
          >
            <div className="relative bg-secondary aspect-[4/3] overflow-hidden">
              {(() => {
                const images = c.slugs
                  .map((s) => findProduct(s)?.image)
                  .filter((i): i is string => !!i);
                return images.length >= 3 ? (
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                  <img
                    src={images[0]}
                    alt=""
                    loading="lazy"
                    className="row-span-2 w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src={images[1]}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <img
                    src={images[2]}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
                    />
                  ))}
                </div>
                );
              })()}
              <span className="absolute top-3 left-3 bg-gold text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                {c.tag}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-display text-xl leading-tight">{c.title}</h3>
              <p className="text-[13px] text-foreground/70 leading-relaxed mt-2 flex-1">
                {c.desc}
              </p>
              <div className="flex items-end justify-between mt-5 pt-4 border-t border-border">
                <div>
                  <p className="text-[11px] text-muted-foreground line-through">
                    ৳{c.original.toLocaleString("en-IN")}
                  </p>
                  <p className="font-display text-2xl text-gold-dark leading-none">
                    ৳{c.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => handleOrder(c.slugs, c.title)}
                  className="text-xs uppercase tracking-wider bg-foreground text-background px-4 py-2.5 rounded-sm hover:bg-gold hover:text-foreground transition"
                >
                  Order now
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}