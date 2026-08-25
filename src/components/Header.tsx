import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export function Header() {
  const { user, itemCount, signOut } = useStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/products" className="flex items-center gap-2 font-semibold tracking-tight">
          <ShoppingBag className="size-5 text-primary" />
          <span className="text-lg">MyStore</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/products"
            activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            className="rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            to="/cart"
            activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingCart className="size-4" />
            Cart
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              {itemCount}
            </span>
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{user?.name}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
