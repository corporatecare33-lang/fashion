import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, setQty, remove, subtotal } = useCart();
  return (
    <Sheet open={drawerOpen} onOpenChange={(v) => !v && closeDrawer()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-2xl">Your Bag ({items.length})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-40" />
              Your cart is empty.
            </div>
          )}
          {items.map((i) => (
            <div key={i.product.slug} className="flex gap-3">
              <img src={i.product.image} alt={i.product.title} className="w-20 h-24 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2">{i.product.title}</p>
                <p className="text-sm text-gold-dark font-semibold mt-1">{i.product.price.toLocaleString()}৳</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="inline-flex items-center border border-border rounded">
                    <button onClick={() => setQty(i.product.slug, i.qty - 1)} className="p-1.5 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.product.slug, i.qty + 1)} className="p-1.5 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(i.product.slug)} className="text-muted-foreground hover:text-destructive ml-auto">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3 bg-secondary/30">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{subtotal().toLocaleString()}৳</span></div>
            <Link to="/checkout" onClick={closeDrawer} className="block text-center w-full bg-foreground text-background py-3 text-sm uppercase tracking-wider hover:bg-gold hover:text-foreground transition">Checkout</Link>
            <Link to="/cart" onClick={closeDrawer} className="block text-center w-full border border-border py-3 text-sm uppercase tracking-wider hover:border-gold transition">View Cart</Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}