import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us — NOORÉVA" },
      { name: "description", content: "Get in touch with NOORÉVA customer support." },
    ],
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="container-luxe py-10">
      <h1 className="font-display text-3xl mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-gold mt-1" /><div><p className="font-semibold">Phone</p><p className="text-sm text-muted-foreground">+8801337018777</p></div></div>
          <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-gold mt-1" /><div><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground">hello@nooreva.com</p></div></div>
          <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-gold mt-1" /><div><p className="font-semibold">Address</p><p className="text-sm text-muted-foreground">40/5 Abdul Hadi Lane, Bangshal</p></div></div>
          <a href="https://wa.me/8801337018777" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-md hover:opacity-90"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent!"); setForm({ name: "", email: "", message: "" }); }} className="bg-card border border-border rounded-md p-5 space-y-3">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full border border-input rounded px-3 py-2.5 text-sm" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border border-input rounded px-3 py-2.5 text-sm" />
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={5} className="w-full border border-input rounded px-3 py-2.5 text-sm" />
          <button type="submit" className="w-full bg-foreground text-background py-2.5 rounded font-semibold uppercase tracking-wider hover:bg-gold hover:text-foreground transition">Send Message</button>
        </form>
      </div>
    </div>
  );
}