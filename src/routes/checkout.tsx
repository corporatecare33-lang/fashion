import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { PaymentModal, type PaymentMethod } from "@/components/PaymentModal";
import { toast } from "sonner";
import { orderApi } from "@/lib/api";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — NOORÉVA" }] }),
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [area, setArea] = useState<"inside" | "outside">("inside");
  const [pay, setPay] = useState<"cod" | PaymentMethod>("cod");
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "", coupon: "" });
  const [modal, setModal] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const delivery = area === "inside" ? 80 : 130;
  const total = subtotal() + delivery;

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) { toast.error("সম্পূর্ণ তথ্য পূরণ করুন"); return; }
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    if (pay === "cod") finishOrder(); else setModal(pay);
  };
  
  const finishOrder = async () => {
    setLoading(true);
    try {
      // Prepare order data for backend
      const orderData = {
        customer_name: form.name,
        customer_email: form.name.toLowerCase().replace(/\s+/g, '') + "@customer.com", // Generate email if not collected
        customer_phone: form.phone,
        shipping_address: form.address,
        city: area === "inside" ? "Dhaka" : "Outside Dhaka",
        payment_method: pay === "cod" ? "Cash on Delivery" : pay,
        notes: form.notes || "",
        shipping_cost: delivery,
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.qty,
        })),
      };

      // Send order to backend
      const response = await orderApi.create(orderData);
      
      // Clear cart
      clear();
      
      // Show success message
      toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
      
      // Navigate to success page with order number
      navigate({ to: "/order-success", search: { id: response.order.order_number } });
    } catch (error: any) {
      console.error("Order creation failed:", error);
      toast.error(error.response?.data?.error || "অর্ডার তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-luxe py-10">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px bg-border flex-1 max-w-[200px]" />
        <h1 className="font-display text-3xl">Checkout</h1>
        <div className="h-px bg-border flex-1 max-w-[200px]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <section className="bg-card border border-border rounded-md p-5">
            <h2 className="font-bold text-gold-dark mb-5">Billing Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5">আপনার নাম <span className="text-red-500">*</span></label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="সম্পূর্ণ নাম লিখুন" className="w-full border border-gold/40 bg-gold/5 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5">ফোন নাম্বার <span className="text-red-500">*</span></label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="০১XXXXXXXXX" className="w-full border border-input bg-secondary/30 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-semibold block mb-1.5">ডেলিভারি ঠিকানা <span className="text-red-500">*</span></label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="গ্রাম, উপজেলা এবং জেলা লিখুন" className="w-full border border-input bg-secondary/30 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-md p-5">
            <h2 className="text-sm font-semibold mb-2">অর্ডার নোট <span className="text-muted-foreground font-normal">(optional)</span></h2>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="ডেলিভারি সম্পর্কে বিশেষ কিছু থাকলে লিখুন।" rows={4} className="w-full border border-input bg-secondary/30 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
          </section>
        </div>

        <div className="space-y-4">
          <section className="bg-card border border-border rounded-md p-5">
            <h2 className="font-bold mb-4">Your Order</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-2 font-semibold">Product</th>
                  <th className="text-right pb-2 font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.product.slug} className="border-b border-border/50">
                    <td className="py-2.5 text-xs">{i.product.title} <span className="text-muted-foreground">× {i.qty}</span></td>
                    <td className="py-2.5 text-right">{(i.product.price * i.qty).toLocaleString()}৳</td>
                  </tr>
                ))}
                <tr className="border-b border-border/50">
                  <td className="py-2.5 font-semibold">Subtotal</td>
                  <td className="py-2.5 text-right font-semibold">{subtotal().toLocaleString()}৳</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 font-semibold align-top">Shipment</td>
                  <td className="py-3 text-right">
                    <div className="flex flex-col gap-1.5 items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="area" checked={area === "inside"} onChange={() => setArea("inside")} className="accent-gold" />
                        <span>ঢাকার ভিতরে: <strong>80৳</strong></span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="area" checked={area === "outside"} onChange={() => setArea("outside")} className="accent-gold" />
                        <span>ঢাকার বাইরে: <strong>130৳</strong></span>
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-base">Total</td>
                  <td className="py-3 text-right font-bold text-base text-gold-dark">{total.toLocaleString()}৳</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="bg-card border border-border rounded-md p-4">
            <p className="text-sm">Have a coupon? <button className="text-blue-600 hover:underline">Click here to enter your coupon code</button></p>
          </section>

          <section className="bg-card border border-border rounded-md p-5">
            <div className="space-y-2">
              {([
                { id: "cod" as const, label: "Cash on delivery", desc: "Pay with cash upon delivery." },
                { id: "bkash" as const, label: "bKash", desc: "Pay with bKash mobile wallet." },
                { id: "nagad" as const, label: "Nagad", desc: "Pay with Nagad mobile wallet." },
                { id: "card" as const, label: "Credit / Debit Card", desc: "Pay securely with your card." },
              ]).map((p) => (
                <label key={p.id} className="flex items-start gap-3 cursor-pointer p-2 hover:bg-secondary/40 rounded">
                  <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} className="mt-1 accent-gold" />
                  <div>
                    <p className="text-sm font-semibold">{p.label}</p>
                    {pay === p.id && <p className="text-xs text-muted-foreground mt-1 bg-secondary/40 px-3 py-2 rounded">{p.desc}</p>}
                  </div>
                </label>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className="text-blue-600 hover:underline">privacy policy</a>.
            </p>
            <button
              onClick={placeOrder}
              disabled={loading}
              className="mt-4 w-full bg-foreground text-background py-3.5 rounded-full font-semibold text-sm tracking-wider hover:bg-gold hover:text-foreground transition shadow-[0_0_0_2px_rgba(255,182,193,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "অর্ডার প্রসেস হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
            </button>
          </section>
        </div>
      </div>

      <PaymentModal method={modal} amount={total} open={!!modal} onClose={() => setModal(null)} onSuccess={() => { setModal(null); finishOrder(); }} />
    </div>
  );
}