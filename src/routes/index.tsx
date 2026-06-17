import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ComboOffers } from "@/components/ComboOffers";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { productsByCategory } from "@/lib/products";
import promoCape from "@/assets/promo-cape.webp";
import promoAccessory from "@/assets/promo-accessory.webp";
import promoVelvet from "@/assets/promo-velvet.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NOORÉVA — Luxury Modest Fashion" },
      { name: "description", content: "Premium hijab, abaya & salat khimar — hand-finished in Dhaka. Shop the Avaya Burka Collection." },
    ],
  }),
});

function Index() {
  const salat = productsByCategory("Salat Khimar");
  const hijab = productsByCategory("Hijab");
  const gown = productsByCategory("Abaya Gown");
  return (
    <>
      <Hero />
      <Categories />
      <WhyChooseUs />
      <section className="container-luxe mt-12">
        <div
          className="rounded-md p-5 md:p-8 bg-[oklch(0.13_0.01_60)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='none' stroke='%23c9a14a' stroke-opacity='0.10' stroke-width='1'><path d='M40 8c8 8 24 8 32 0-8 8-8 24 0 32-8-8-24-8-32 0-8-8-24-8-32 0 8-8 8-24 0-32 8 8 24 8 32 0z'/><circle cx='40' cy='40' r='3'/><circle cx='0' cy='0' r='2'/><circle cx='80' cy='0' r='2'/><circle cx='0' cy='80' r='2'/><circle cx='80' cy='80' r='2'/></g></svg>\")",
            backgroundSize: "80px 80px",
          }}
        >
          <h2 className="font-display text-center text-2xl md:text-3xl text-gold mb-6">Salat Khimar</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {salat.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
      <ComboOffers />
      <section className="container-luxe mt-12">
        <SectionHeader title="Hijab" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hijab.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <section className="container-luxe mt-12">
        <SectionHeader title="Abaya Gown" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <Testimonials />
      <section className="container-luxe mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="md:col-span-2 block overflow-hidden rounded-md shadow-card hover:shadow-luxe transition">
            <img src={promoCape} alt="Premium Cape & Cover Up" loading="lazy" className="w-full h-full object-cover" />
          </a>
          <div className="grid grid-cols-1 gap-4">
            <a href="#" className="block overflow-hidden rounded-md shadow-card hover:shadow-luxe transition">
              <img src={promoAccessory} alt="Must Have Modesty Accessory" loading="lazy" className="w-full h-full object-cover" />
            </a>
            <a href="#" className="block overflow-hidden rounded-md shadow-card hover:shadow-luxe transition">
              <img src={promoVelvet} alt="Velvet Touch — Timeless Elegance" loading="lazy" className="w-full h-full object-cover" />
            </a>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
