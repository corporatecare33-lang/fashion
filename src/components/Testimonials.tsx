import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Tasnim Akter",
    city: "Uttara, Dhaka",
    product: "Nida Salat Khimar — Black",
    body:
      "Namaz-er somoy onek smooth. Fabric heavy na, abar transparent o na. Eta age onek brand-e khujechi, peyechi ekhane. 3 ta order korechi already.",
  },
  {
    name: "Marzia Rahman",
    city: "Chittagong",
    product: "Korean Chiffon Hijab — Olive",
    body:
      "Pin diye atke rakha lage na, nije-i bose thake. Color ekdom photo-r moto chilo. Courier-e 2 din-e peyechi.",
  },
  {
    name: "Sumaiya Islam",
    city: "Mirpur, Dhaka",
    product: "Avaya Burka Collection",
    body:
      "Stitching ekdom clean, kothao suta ber hoye nai. Apa-r sathe Whatsapp-e size niye onek shahajjo korechilo, etai onnoder theke alada.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const total = reviews.length;

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const r = reviews[i];

  return (
    <section className="container-luxe mt-16">
      <div className="text-center mb-8">
        <span className="text-[11px] tracking-[0.25em] uppercase text-gold">From our buyers</span>
        <h2 className="font-display text-3xl md:text-4xl mt-2">Apnader kotha</h2>
      </div>
      <div className="relative max-w-3xl mx-auto">
        <figure
          key={r.name}
          className="rounded-md border border-border bg-card px-8 md:px-14 py-10 md:py-12 text-center animate-in fade-in duration-500"
        >
          <div className="flex justify-center gap-0.5 text-gold mb-5">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="font-display text-xl md:text-2xl leading-relaxed text-foreground/90">
            {r.body}
          </blockquote>
          <figcaption className="mt-7 pt-5 border-t border-border max-w-xs mx-auto">
            <p className="font-medium text-sm">{r.name}</p>
            <p className="text-[11px] text-muted-foreground">{r.city}</p>
            <p className="text-[11px] text-gold mt-1 uppercase tracking-wider">{r.product}</p>
          </figcaption>
        </figure>

        <button
          aria-label="Previous review"
          onClick={() => setI((n) => (n - 1 + total) % total)}
          className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card border border-border hover:border-gold text-foreground flex items-center justify-center shadow-card transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next review"
          onClick={() => setI((n) => (n + 1) % total)}
          className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card border border-border hover:border-gold text-foreground flex items-center justify-center shadow-card transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="flex justify-center gap-2 mt-5">
          {reviews.map((_, k) => (
            <button
              key={k}
              aria-label={`Go to review ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-1.5 bg-foreground/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}