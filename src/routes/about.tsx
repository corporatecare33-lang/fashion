import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — NOORÉVA" },
      { name: "description", content: "Learn about NOORÉVA, a luxury Bangladeshi modest fashion house." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="container-luxe py-12 max-w-3xl">
      <h1 className="font-display text-4xl mb-6">About NOORÉVA</h1>
      <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>NOORÉVA is a luxury Bangladeshi modest fashion house crafting heirloom-quality clothing for the modern wardrobe. Every piece is hand-finished in Dhaka.</p>
        <p>We specialize in premium hijabs, abayas, salat khimars, and abaya gowns — designed for women who value both faith and contemporary elegance.</p>
        <p>Our mission is simple: timeless modest fashion at honest prices, delivered to your door across Bangladesh.</p>
      </div>
    </div>
  );
}