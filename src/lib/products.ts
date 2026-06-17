import khimar1 from "@/assets/product-khimar-1.jpg";
import khimar2 from "@/assets/product-khimar-2.jpg";
import khimar3 from "@/assets/product-khimar-3.jpg";
import khimar4 from "@/assets/product-khimar-4.jpg";
import hijab1 from "@/assets/product-hijab-1.jpg";
import hijab2 from "@/assets/product-hijab-2.jpg";
import hijab3 from "@/assets/product-hijab-3.png";
import hijab4 from "@/assets/product-hijab-4.png";
import gown1 from "@/assets/product-gown-1.jpg";
import gown2 from "@/assets/product-gown-2.jpg";
import gown3 from "@/assets/product-gown-3.jpg";
import gown4 from "@/assets/product-gown-4.jpg";
import catHijab from "@/assets/cat-hijab.jpg";
import catAbaya from "@/assets/cat-abaya.jpg";
import catKaftan from "@/assets/cat-kaftan.jpg";
import catRegular from "@/assets/cat-regular.jpg";
import catGown from "@/assets/cat-gown.jpg";
import catSalat from "@/assets/cat-salat.jpg";

export type Product = {
  id: number;
  slug: string;
  title: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice: number;
  category: "Salat Khimar" | "Hijab" | "Abaya Gown";
  sku: string;
  description: string;
};

export const categories = [
  { name: "Hijab", slug: "hijab", image: catHijab },
  { name: "Abaya", slug: "abaya", image: catAbaya },
  { name: "Karchupi Abayas", slug: "karchupi-abayas", image: catKaftan },
  { name: "Regular Abayas", slug: "regular-abayas", image: catRegular },
  { name: "Abaya Gown", slug: "abaya-gown", image: catGown },
  { name: "Salat Khimar", slug: "salat-khimar", image: catSalat },
];

export const products: Product[] = [
  { id: 1, slug: "salat-khimar-sk-16", title: "Hoor – Full Length Salat Khimar | SK-16", image: khimar1, gallery: [khimar1, khimar2], price: 1290, oldPrice: 1590, category: "Salat Khimar", sku: "SK-16", description: "A flowing full-length salat khimar in soft breathable fabric with delicate floral embroidery. Cut for full coverage and effortless prayer." },
  { id: 2, slug: "salat-khimar-sk-19", title: "Hoor – Full Length Salat Khimar | SK-19", image: khimar2, gallery: [khimar2, khimar1, khimar3, khimar4], price: 1290, oldPrice: 1590, category: "Salat Khimar", sku: "SK-19", description: "Teal patterned salat khimar with intricate gold-toned motifs. Lightweight and luxurious." },
  { id: 3, slug: "salat-khimar-sk-28", title: "Hoor – Full Length Salat Khimar | SK-28", image: khimar3, gallery: [khimar3, khimar1, khimar2, khimar4], price: 1290, oldPrice: 1590, category: "Salat Khimar", sku: "SK-28", description: "Premium printed full length khimar with relaxed silhouette." },
  { id: 4, slug: "salat-khimar-sk-17", title: "Hoor – Full Length Salat Khimar | SK-17", image: khimar4, gallery: [khimar4, khimar1, khimar2, khimar3], price: 1290, oldPrice: 1590, category: "Salat Khimar", sku: "SK-17", description: "Vibrant blue paisley salat khimar with full coverage." },
  { id: 5, slug: "amirah-hijab-gt-2161", title: "Amirah Ready Hijab | GT-2161", image: hijab1, gallery: [hijab1, hijab2, hijab3, hijab4], price: 1050, oldPrice: 1450, category: "Hijab", sku: "GT-2161", description: "Premium soft cotton-feel cey fabric ready hijab. No pinning, no fuss — just elegant coverage." },
  { id: 6, slug: "amirah-hijab-gt-2168", title: "Amirah Ready Hijab | GT-2168", image: hijab2, gallery: [hijab2, hijab1, hijab3, hijab4], price: 1050, oldPrice: 1450, category: "Hijab", sku: "GT-2168", description: "Deep burgundy ready hijab in soft breathable cey fabric. Comfortable all-day wear." },
  { id: 7, slug: "amirah-hijab-gt-2159", title: "Amirah Ready Hijab | GT-2159", image: hijab3, gallery: [hijab3, hijab1, hijab2, hijab4], price: 1050, oldPrice: 1450, category: "Hijab", sku: "GT-2159", description: "Warm caramel tones in our signature cey-fabric ready hijab." },
  { id: 8, slug: "amirah-hijab-gt-2150", title: "Amirah Ready Hijab | GT-2150", image: hijab4, gallery: [hijab4, hijab1, hijab2, hijab3], price: 1050, oldPrice: 1450, category: "Hijab", sku: "GT-2150", description: "Classic black ready hijab. Adjustable, no-pin design for effortless coverage." },
  { id: 9, slug: "anika-maham-gown-gt-1499", title: "Anika / Maham Abaya Gown | GT-1499", image: gown1, gallery: [gown1, gown2], price: 1690, oldPrice: 1990, category: "Abaya Gown", sku: "GT-1499", description: "Black layered cape-style abaya gown — sculpted draping for a modern modest silhouette." },
  { id: 10, slug: "anika-cape-gown-gt-1513", title: "Anika Cape Style Abaya Gown | GT-1513", image: gown2, gallery: [gown2, gown1], price: 1690, oldPrice: 1990, category: "Abaya Gown", sku: "GT-1513", description: "Two-tone rust and black cape-style abaya gown." },
  { id: 11, slug: "anika-cape-gown-gt-1484", title: "Anika Cape Style Abaya Gown | GT-1484", image: gown3, gallery: [gown3, gown1], price: 1690, oldPrice: 1990, category: "Abaya Gown", sku: "GT-1484", description: "Sage mint hijab cape over flowing black abaya — calm and contemporary." },
  { id: 12, slug: "anika-cape-gown-gt-1483", title: "Anika Cape Style Abaya Gown | GT-1483", image: gown4, gallery: [gown4, gown1], price: 1690, oldPrice: 1990, category: "Abaya Gown", sku: "GT-1483", description: "Coral hijab cape with belted black abaya — modern romantic." },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: Product["category"]) =>
  products.filter((p) => p.category === cat);

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const productsByCategorySlug = (slug: string) => {
  const map: Record<string, Product["category"][]> = {
    "hijab": ["Hijab"],
    "abaya": ["Abaya Gown"],
    "karchupi-abayas": ["Abaya Gown"],
    "regular-abayas": ["Abaya Gown"],
    "abaya-gown": ["Abaya Gown"],
    "salat-khimar": ["Salat Khimar"],
  };
  const cats = map[slug] ?? [];
  return products.filter((p) => cats.includes(p.category));
};

export const searchProducts = (q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products
    .filter((p) => p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s))
    .slice(0, 6);
};