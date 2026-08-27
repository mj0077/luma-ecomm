import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth.functions";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — MyStore" },
      {
        name: "description",
        content: "Sign up for MyStore to browse the catalog and build your cart.",
      },
      { property: "og:title", content: "Create your account — MyStore" },
      {
        property: "og:description",
        content: "Sign up for MyStore to browse the catalog and build your cart.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { ready, user, signIn } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    city: "",
    country: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/products", replace: true });
  }, [ready, user, navigate]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const result = await signup({ data: form });
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
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Create Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">It only takes a moment</p>
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
              maxLength={255}
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              maxLength={100}
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              maxLength={100}
              placeholder="Mumbai"
              value={form.city}
              onChange={update("city")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              maxLength={100}
              placeholder="India"
              value={form.country}
              onChange={update("country")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              maxLength={20}
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={update("phone")}
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
            {pending ? "Creating account…" : "Sign up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
