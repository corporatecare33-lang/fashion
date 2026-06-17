import { Link } from "@tanstack/react-router";

export function SectionHeader({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between mb-5 border-b-2 ${dark ? "border-gold/40" : "border-gold"} pb-2`}>
      <h2 className={`font-display text-xl md:text-2xl font-semibold tracking-wide uppercase ${dark ? "text-gold" : ""}`}>{title}</h2>
      <Link to="/" className="text-xs px-3 py-1.5 bg-foreground text-background hover:bg-gold hover:text-foreground transition uppercase tracking-wider">
        See more
      </Link>
    </div>
  );
}