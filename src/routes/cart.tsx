import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart — NOORÉVA" }] }),
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const delivery = items.length ? 80 : 0;
  const total = subtotal() + delivery;
  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          Your cart is empty. <Link to="/" className="text-gold underline">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.product.slug} className="flex gap-4 bg-card border border-border rounded p-4">
                <img src={i.product.image} alt={i.product.title} className="w-24 h-32 object-cover rounded" />
                <div className="flex-1">
                  <Link to="/product/$slug" params={{ slug: i.product.slug }} className="font-medium hover:text-gold">{i.product.title}</Link>
                  <p className="text-sm text-gold-dark font-semibold mt-1">{i.product.price.toLocaleString()}৳</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="inline-flex items-center border border-border rounded">
                      <button onClick={() => setQty(i.product.slug, i.qty - 1)} className="p-2"><Minus className="h-3 w-3" /></button>
                      <span className="px-4 text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.product.slug, i.qty + 1)} className="p-2"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(i.product.slug)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="font-semibold">{(i.product.price * i.qty).toLocaleString()}৳</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded p-6 h-fit space-y-3">
            <h2 className="font-display text-xl">Order Summary</h2>
            <input placeholder="Coupon code" className="w-full px-3 py-2 border border-input rounded text-sm" />
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{subtotal().toLocaleString()}৳</span></div>
            <div className="flex justify-between text-sm"><span>Delivery</span><span>{delivery}৳</span></div>
            <div className="flex justify-between font-bold border-t border-border pt-3"><span>Total</span><span className="text-gold-dark">{total.toLocaleString()}৳</span></div>
            <Link to="/checkout" className="block text-center bg-foreground text-background py-3 hover:bg-gold hover:text-foreground transition uppercase tracking-wider text-sm">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}