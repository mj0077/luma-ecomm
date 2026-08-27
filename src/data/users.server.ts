export type DemoUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  phone?: string;
};

export const demoUsers: DemoUser[] = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456" },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "admin123" },
  { id: 4, name: "Demo User", email: "demo@example.com", password: "demo123" },
];

export function findUser(email: string, password: string) {
  return demoUsers.find((u) => u.email === email && u.password === password);
}

export function addUser(input: {
  email: string;
  password: string;
  city: string;
  country: string;
  phone: string;
}): DemoUser {
  const user: DemoUser = {
    id: Math.max(0, ...demoUsers.map((u) => u.id)) + 1,
    name: input.email.split("@")[0],
    email: input.email,
    password: input.password,
    city: input.city,
    country: input.country,
    phone: input.phone,
  };
  demoUsers.push(user);
  return user;
}

export function listCredentials() {
  return demoUsers.map((u) => ({ email: u.email, password: u.password }));
}
