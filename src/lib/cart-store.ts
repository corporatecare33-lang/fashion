import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type State = {
  items: CartItem[];
  drawerOpen: boolean;
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      drawerOpen: false,
      add: (p, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.product.slug === p.slug);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product.slug === p.slug ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { product: p, qty }] };
        }),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.product.slug !== slug) })),
      setQty: (slug, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      subtotal: () => get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: "nooreva-cart" },
  ),
);