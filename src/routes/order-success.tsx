import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/order-success")({
  component: Success,
  validateSearch: z.object({ id: z.string().optional() }),
  head: () => ({ meta: [{ title: "Order Confirmed — NOORÉVA" }] }),
});

function Success() {
  const { id } = Route.useSearch();
  return (
    <div className="container-luxe py-20 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 rounded-full bg-gold mx-auto flex items-center justify-center shadow-luxe">
        <Check className="h-10 w-10 text-foreground" strokeWidth={3} />
      </motion.div>
      <h1 className="font-display text-4xl mt-6">Thank you for your order</h1>
      <p className="text-muted-foreground mt-2">Your order has been placed successfully.</p>
      {id && <p className="mt-4 text-sm">Order ID: <span className="font-mono font-semibold">{id}</span></p>}
      <Link to="/" className="mt-8 inline-flex bg-foreground text-background px-6 py-3 uppercase tracking-wider text-sm hover:bg-gold hover:text-foreground transition">Continue shopping</Link>
    </div>
  );
}