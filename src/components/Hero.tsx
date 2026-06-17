import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

type Slide = { src: string; alt: string };

const slides: Slide[] = [
  { src: banner1, alt: "Avaya Burka Collection — Made To Empower" },
  { src: banner2, alt: "Redefine Your Modesty — New Arrival 2026" },
  { src: banner3, alt: "Elegant Modest Fashion Collection" },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);
  const current = slides[i];

  return (
    <section className="container-luxe mt-4">
      <div className="relative overflow-hidden rounded-md shadow-luxe group bg-[oklch(0.08_0.01_60)]">
        <Link to="/" className="block relative aspect-[1920/810] w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              draggable={false}
            />
          </AnimatePresence>
        </Link>

        {/* Navigation arrows */}
        <button
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-11 md:w-11 rounded-full bg-background/10 backdrop-blur border border-gold/40 text-gold opacity-60 md:opacity-0 md:group-hover:opacity-100 hover:bg-gold hover:text-foreground transition flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-11 md:w-11 rounded-full bg-background/10 backdrop-blur border border-gold/40 text-gold opacity-60 md:opacity-0 md:group-hover:opacity-100 hover:bg-gold hover:text-foreground transition flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-background/40 hover:bg-background/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}