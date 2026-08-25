import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { RequireAuth } from "@/components/RequireAuth";
import { products } from "@/data/products";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => String(p.id) === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — MyStore" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — MyStore` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — MyStore` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  return (
    <RequireAuth>
      <ProductDetailContent />
    </RequireAuth>
  );
}

function ProductDetailContent() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useStore();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={product.image}
              alt={product.name}
              width={768}
              height={768}
              className="aspect-square size-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-muted-foreground">{product.description}</p>
            <p className="mt-6 text-2xl font-semibold">{formatPrice(product.price)}</p>
            <Button
              className="mt-8 w-full sm:w-auto"
              onClick={() => {
                addToCart(product.id);
                toast.success(`${product.name} added to cart.`);
              }}
            >
              <Plus className="size-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
