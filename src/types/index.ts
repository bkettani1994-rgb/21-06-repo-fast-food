export type Category = "burgers" | "tacos" | "sides" | "drinks" | "desserts";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  tags: string[];
  spicy?: boolean;
  popular?: boolean;
  vegetarian?: boolean;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type OrderStatus =
  | "received"
  | "preparing"
  | "cooking"
  | "delivering"
  | "delivered";

export interface Order {
  id: string;
  lines: CartLine[];
  total: number;
  status: OrderStatus;
  customerName: string;
  address: string;
  createdAt: number;
  updatedAt: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: number;
}
