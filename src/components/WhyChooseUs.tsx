import { ShieldCheck, Truck, RotateCcw, Scissors } from "lucide-react";

const items = [
  {
    icon: Scissors,
    title: "Hand-finished in Dhaka",
    desc: "Cut, stitched & pressed by our karigors in Bangshal — no factory line.",
  },
  {
    icon: ShieldCheck,
    title: "Premium fabric only",
    desc: "Nida, Korean chiffon, georgette — sourced ourselves, no mixed lots.",
  },
  {
    icon: Truck,
    title: "Same-day Dhaka delivery",
    desc: "Order before 2pm — pathao or steadfast straight to your door.",
  },
  {
    icon: RotateCcw,
    title: "7-day easy exchange",
    desc: "Size na milte? Whatsapp koren, ami next day exchange kore debo.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-luxe mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-md border border-gold/25 bg-card p-5 hover:border-gold transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-3">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-sans text-[15px] font-semibold text-foreground leading-snug mb-1.5">{title}</h3>
            <p className="text-[13px] text-foreground/70 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}