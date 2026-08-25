import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type CartEntry } from "@/lib/store";

export function CartItemRow({
  entry,
  onQuantityChange,
  onRemove,
}: {
  entry: CartEntry;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}) {
  const { product, quantity, subtotal } = entry;

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-border px-4 py-4 last:border-b-0 sm:px-6">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={768}
        height={768}
        className="size-16 rounded-xl object-cover"
      />
      <div className="min-w-40 flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
      </div>

      <div className="flex items-center gap-1 rounded-full border border-border p-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          aria-label={`Decrease quantity of ${product.name}`}
          onClick={() => onQuantityChange(product.id, quantity - 1)}
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          aria-label={`Increase quantity of ${product.name}`}
          onClick={() => onQuantityChange(product.id, quantity + 1)}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <p className="w-24 text-right font-semibold">{formatPrice(subtotal)}</p>

      <Button
        variant="ghost"
        size="icon"
        aria-label={`Remove ${product.name}`}
        className="text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(product.id)}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
