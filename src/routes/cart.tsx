import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Header } from "@/components/Header";
import { CartItemRow } from "@/components/CartItemRow";
import { RequireAuth } from "@/components/RequireAuth";
import { Button } from "@/components/ui/button";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "My Cart — MyStore" },
      { name: "description", content: "Review the items in your MyStore cart and see your total." },
      { property: "og:title", content: "My Cart — MyStore" },
      { property: "og:description", content: "Review the items in your MyStore cart and see your total." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return (
    <RequireAuth>
      <CartContent />
    </RequireAuth>
  );
}

function CartContent() {
  const { entries, total, setQuantity, removeFromCart } = useStore();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Cart</h1>

        {entries.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">Your cart is empty.</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Looks like you haven't added anything yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {entries.map((entry) => (
                <CartItemRow
                  key={entry.product.id}
                  entry={entry}
                  onQuantityChange={setQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
