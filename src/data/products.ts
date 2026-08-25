export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium over-ear audio with active noise cancelling",
    price: 79.99,
    image: "/images/headphones.jpg",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Tactile switches with a compact aluminium frame",
    price: 99.99,
    image: "/images/keyboard.jpg",
  },
  {
    id: 3,
    name: "Smart Watch",
    description: "Fitness tracking and notifications on your wrist",
    price: 149.99,
    image: "/images/watch.jpg",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    description: "Silent clicks with precision optical tracking",
    price: 39.99,
    image: "/images/mouse.jpg",
  },
  {
    id: 5,
    name: "USB-C Hub",
    description: "Seven ports of connectivity in a slim shell",
    price: 49.99,
    image: "/images/hub.jpg",
  },
  {
    id: 6,
    name: "Portable Speaker",
    description: "Room-filling sound with 20 hours of playback",
    price: 69.99,
    image: "/images/speaker.jpg",
  },
  {
    id: 7,
    name: "Gaming Controller",
    description: "Low-latency wireless with textured grips",
    price: 59.99,
    image: "/images/controller.jpg",
  },
  {
    id: 8,
    name: "Laptop Stand",
    description: "Adjustable aluminium riser for better posture",
    price: 44.99,
    image: "/images/stand.jpg",
  },
  {
    id: 9,
    name: "Power Bank",
    description: "20,000mAh fast charging for all your devices",
    price: 34.99,
    image: "/images/powerbank.jpg",
  },
  {
    id: 10,
    name: "Bluetooth Earbuds",
    description: "Compact buds with a pocketable charging case",
    price: 89.99,
    image: "/images/earbuds.jpg",
  },
];
