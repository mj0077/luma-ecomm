import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { RequireAuth } from "@/components/RequireAuth";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — MyStore" },
      { name: "description", content: "Browse headphones, keyboards, watches and more tech essentials at MyStore." },
      { property: "og:title", content: "Products — MyStore" },
      { property: "og:description", content: "Browse headphones, keyboards, watches and more tech essentials at MyStore." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <RequireAuth>
      <ProductsContent />
    </RequireAuth>
  );
}

function ProductsContent() {
  const { addToCart } = useStore();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A small selection of everyday tech essentials.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={(p) => {
                addToCart(p.id);
                toast.success(`${p.name} added to cart.`);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
