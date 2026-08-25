import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { SessionUser } from "./auth.functions";
import { products, type Product } from "@/data/products";

const AUTH_KEY = "mystore.user";
const CART_KEY = "mystore.cart";

export type CartLine = { productId: number; quantity: number };
export type CartEntry = { product: Product; quantity: number; subtotal: number };

type StoreValue = {
  ready: boolean;
  user: SessionUser | null;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
  lines: CartLine[];
  entries: CartEntry[];
  itemCount: number;
  total: number;
  addToCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(AUTH_KEY);
      if (rawUser) setUser(JSON.parse(rawUser) as SessionUser);
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) setLines(JSON.parse(rawCart) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const signIn = useCallback((next: SessionUser) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(CART_KEY);
    setUser(null);
    setLines([]);
  }, []);

  const addToCart = useCallback((productId: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const entries = useMemo<CartEntry[]>(
    () =>
      lines.flatMap((line) => {
        const product = products.find((p) => p.id === line.productId);
        if (!product) return [];
        return [
          {
            product,
            quantity: line.quantity,
            subtotal: Math.round(product.price * line.quantity * 100) / 100,
          },
        ];
      }),
    [lines],
  );

  const value: StoreValue = {
    ready,
    user,
    signIn,
    signOut,
    lines,
    entries,
    itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
    total: Math.round(entries.reduce((sum, e) => sum + e.subtotal, 0) * 100) / 100,
    addToCart,
    setQuantity,
    removeFromCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
