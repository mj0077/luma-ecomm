export type DemoUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const demoUsers: DemoUser[] = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "password123" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "password456" },
  { id: 3, name: "Admin User", email: "admin@example.com", password: "admin123" },
  { id: 4, name: "Demo User", email: "demo@example.com", password: "demo123" },
];
