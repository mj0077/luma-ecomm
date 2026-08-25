import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth.functions";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — MyStore" },
      { name: "description", content: "Sign in to MyStore to browse products and manage your cart." },
      { property: "og:title", content: "Sign in — MyStore" },
      { property: "og:description", content: "Sign in to MyStore to browse products and manage your cart." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { ready, user, signIn } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/products", replace: true });
  }, [ready, user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter both your email and password.");
      return;
    }
    setPending(true);
    try {
      const result = await login({ data: { email, password } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      signIn(result.user);
      navigate({ to: "/products", replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight">
            <ShoppingBag className="size-6 text-primary" />
            MyStore
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" /> : null}
            {pending ? "Signing in…" : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo account: john@example.com / password123
        </p>
      </div>
    </main>
  );
}
