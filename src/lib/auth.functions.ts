import { createServerFn } from "@tanstack/react-start";

export type SessionUser = { id: number; name: string; email: string };
export type LoginResult =
  | { ok: true; user: SessionUser }
  | { ok: false; error: string };
export type Credential = { email: string; password: string };

export const login = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }): Promise<LoginResult> => {
    const { findUser } = await import("@/data/users.server");
    const email = data.email.trim().toLowerCase();
    if (!email || !data.password) {
      return { ok: false, error: "Please enter both email and password." };
    }
    const match = findUser(email, data.password);
    if (!match) return { ok: false, error: "Invalid email or password." };
    return { ok: true, user: { id: match.id, name: match.name, email: match.email } };
  });

export const signup = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      email: string;
      password: string;
      city: string;
      country: string;
      phone: string;
    }) => input,
  )
  .handler(async ({ data }): Promise<LoginResult> => {
    const { demoUsers, addUser } = await import("@/data/users.server");
    const email = data.email.trim().toLowerCase();
    const password = data.password;
    const city = data.city.trim();
    const country = data.country.trim();
    const phone = data.phone.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (password.length < 6 || password.length > 100) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }
    if (!city || city.length > 100) return { ok: false, error: "Please enter a valid city." };
    if (!country || country.length > 100)
      return { ok: false, error: "Please enter a valid country." };
    if (!/^[+\d][\d\s\-()]{5,19}$/.test(phone)) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
    if (demoUsers.some((u) => u.email === email)) {
      return { ok: false, error: "An account with that email already exists." };
    }

    const user = addUser({ email, password, city, country, phone });
    return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
  });

export const getCredentials = createServerFn({ method: "GET" }).handler(
  async (): Promise<Credential[]> => {
    const { listCredentials } = await import("@/data/users.server");
    return listCredentials();
  },
);
