import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import paymentMethods from "@/assets/payment-methods.png";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.13_0.01_60)] text-background mt-20 border-t-2 border-gold/40">
      <div className="container-luxe py-10 md:py-12 grid gap-5 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="border border-background/15 rounded-lg p-5">
          <Link to="/" className="inline-block" aria-label="NOORÉVA — Home">
            <span className="font-display text-2xl font-semibold tracking-[0.18em]">
              <span className="text-background">NOOR</span><span className="text-gold">ÉVA</span>
            </span>
          </Link>
          <p className="mt-4 text-xs text-gold/90 leading-relaxed">
            A luxury Bangladeshi modest fashion house crafting premium hijabs, abayas, and timeless Islamic fashion for the modern woman.
          </p>
          <div className="mt-5 flex gap-2">
            <a className="p-2 bg-background/10 rounded-full hover:bg-gold hover:text-foreground transition cursor-pointer"><Facebook className="h-3.5 w-3.5" /></a>
            <a className="p-2 bg-background/10 rounded-full hover:bg-gold hover:text-foreground transition cursor-pointer"><Youtube className="h-3.5 w-3.5" /></a>
            <a className="p-2 bg-background/10 rounded-full hover:bg-gold hover:text-foreground transition cursor-pointer"><MessageCircle className="h-3.5 w-3.5" /></a>
            <a className="p-2 bg-background/10 rounded-full hover:bg-gold hover:text-foreground transition cursor-pointer"><Instagram className="h-3.5 w-3.5" /></a>
          </div>
        </div>
        <div className="border border-background/15 rounded-lg p-5">
          <h4 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition">Contact Us</Link></li>
          </ul>
        </div>
        <div className="border border-background/15 rounded-lg p-5">
          <h4 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Support Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a className="hover:text-gold transition cursor-pointer">Privacy Policy</a></li>
            <li><a className="hover:text-gold transition cursor-pointer">Terms & Conditions</a></li>
            <li><a className="hover:text-gold transition cursor-pointer">Refund and Returns Policy</a></li>
            <li><Link to="/track-order" className="hover:text-gold transition">Track Your Order</Link></li>
          </ul>
        </div>
        <div className="border border-background/15 rounded-lg p-5">
          <h4 className="text-gold uppercase tracking-widest text-sm font-bold mb-4">Contacts</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>+8801337018777</span></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>40/5 Abdul Hadi Lane, Bangshal</span></li>
            <li className="flex items-start gap-2"><MessageCircle className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>whatsapp - 01337018777</span></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" /><span>hello@nooreva.com</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/30">
        <div className="container-luxe py-4 md:py-5">
          <img
            src={paymentMethods}
            alt="Accepted payment methods — SSLCommerz"
            loading="lazy"
            className="mx-auto w-full max-w-5xl h-auto object-contain"
          />
        </div>
        <div className="border-t border-gold/20">
          <div className="container-luxe py-4 text-center text-xs text-background/60">
            © {new Date().getFullYear()} NOORÉVA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}