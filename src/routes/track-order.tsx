import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Package } from "lucide-react";

export const Route = createFileRoute("/track-order")({
  component: TrackOrderPage,
  head: () => ({
    meta: [
      { title: "Track Order — NOORÉVA" },
      { name: "description", content: "Track your NOORÉVA order status." },
    ],
  }),
});

function TrackOrderPage() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  return (
    <div className="container-luxe py-12 max-w-xl">
      <h1 className="font-display text-3xl mb-2">Track your order</h1>
      <p className="text-muted-foreground text-sm mb-6">Enter your order ID to check delivery status.</p>
      <form onSubmit={(e) => { e.preventDefault(); if (!id) return toast.error("Enter order ID"); setStatus("In Transit"); }} className="flex gap-2">
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. FW12345678" className="flex-1 border border-input rounded px-3 py-2.5 text-sm" />
        <button type="submit" className="bg-foreground text-background px-5 rounded font-semibold uppercase tracking-wider hover:bg-gold hover:text-foreground transition">Track</button>
      </form>
      {status && (
        <div className="mt-6 bg-card border border-border rounded-md p-5 flex items-center gap-4">
          <Package className="h-8 w-8 text-gold" />
          <div>
            <p className="font-semibold">Order {id}</p>
            <p className="text-sm text-muted-foreground">Status: <span className="text-gold-dark font-semibold">{status}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}