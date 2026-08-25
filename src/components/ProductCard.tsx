import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/store";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold leading-tight text-card-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-3 text-lg font-semibold">{formatPrice(product.price)}</p>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            onAdd(product);
            setAdded(true);
          }}
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          {added ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
