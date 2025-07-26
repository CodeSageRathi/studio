
export type Role = 'buyer' | 'supplier';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  location?: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
}

export interface Product {
  id: string;
  name:string;
  category: string;
  price: number;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
  dataAiHint?: string;
  stock: number;
  moq: number;
  supplierId: string;
  description: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  status: 'Live' | 'Pending' | 'Delivered' | 'Cancelled';
  date: string;
  total: number;
  items: OrderItem[];
  buyerId: string;
  supplierId: string;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  isAi?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSender: boolean;
}
