import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="container-luxe mt-24 md:mt-28">
      <div className="relative overflow-hidden rounded-md bg-foreground text-background px-6 py-12 md:px-12 md:py-16">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.78 0.13 80) 0, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.78 0.13 80) 0, transparent 35%)",
          }}
        />
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[11px] tracking-[0.25em] uppercase text-gold">NOORÉVA VIP</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
              Notun drop er age <br /> apni jante parben.
            </h2>
            <p className="text-sm text-background/70 mt-3 max-w-md">
              Email diye rakhen — Eid, winter collection ar limited piece er
              jonno 24 ghonta early access pabe shudhu VIP-ra.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="flex flex-col sm:flex-row gap-2 bg-background/5 backdrop-blur-md border border-background/15 rounded-md p-2"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <input
                type="email"
                required
                placeholder="apnar@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full py-2.5 text-sm outline-none placeholder:text-background/40"
              />
            </div>
            <button
              type="submit"
              className="bg-gold text-foreground font-medium text-sm px-5 py-2.5 rounded-md hover:bg-gold/90 transition-colors uppercase tracking-wider"
            >
              {done ? "Done ✓" : "Join VIP"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}