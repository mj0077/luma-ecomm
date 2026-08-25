import { createServerFn } from "@tanstack/react-start";

export type SessionUser = { id: number; name: string; email: string };
export type LoginResult =
  | { ok: true; user: SessionUser }
  | { ok: false; error: string };

export const login = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string; password: string }) => input)
  .handler(async ({ data }): Promise<LoginResult> => {
    const { demoUsers } = await import("@/data/users.server");
    const email = data.email.trim().toLowerCase();
    if (!email || !data.password) {
      return { ok: false, error: "Please enter both email and password." };
    }
    const match = demoUsers.find(
      (u) => u.email === email && u.password === data.password,
    );
    if (!match) return { ok: false, error: "Invalid email or password." };
    return { ok: true, user: { id: match.id, name: match.name, email: match.email } };
  });
