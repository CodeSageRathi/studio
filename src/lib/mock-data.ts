
import type { Product, Order, User, ChatContact, Message, Role } from '@/types';

export const mockUsers: Record<string, User> = {
  buyer: {
    id: 'user-1',
    name: 'Anjali Sharma',
    email: 'anjali.sharma@example.com',
    role: 'buyer',
    avatar: 'https://placehold.co/100x100.png',
  },
  supplier1: {
    id: 'user-2',
    name: 'Das Provisions',
    email: 'das.provisions@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 22.5626,
      lng: 88.3530,
      city: 'B.B.D. Bagh, Kolkata',
      country: 'India',
    }
  },
  supplier2: {
    id: 'user-3',
    name: 'Ghosh Spices',
    email: 'ghosh.spices@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 22.5726,
      lng: 88.3639,
      city: 'Sealdah, Kolkata',
      country: 'India',
    }
  },
  supplier3: {
    id: 'user-4',
    name: 'Sen Wholesale',
    email: 'sen.wholesale@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 22.5448,
      lng: 88.3426,
      city: 'Alipore, Kolkata',
      country: 'India',
    }
  },
   supplier4: {
    id: 'user-5',
    name: 'Roy Edibles',
    email: 'roy.edibles@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 22.5176,
      lng: 88.3831,
      city: 'Ballygunge, Kolkata',
      country: 'India',
    }
  },
   supplier5: {
    id: 'user-6',
    name: 'Howrah Traders',
    email: 'howrah.traders@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 22.5958,
      lng: 88.2636,
      city: 'Howrah',
      country: 'India',
    }
  },
  supplier6: {
    id: 'user-7',
    name: 'New Delhi Grains',
    email: 'ndg@example.com',
    role: 'supplier',
    avatar: 'https://placehold.co/100x100.png',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      city: 'New Delhi',
      country: 'India',
    }
  },
};

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 120,
    rating: 4.5,
    deliveryTime: '2 days',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'basmati rice',
    stock: 500,
    moq: 50,
    supplierId: 'user-2',
    description: 'Premium quality Basmati rice, aged for two years for perfect aroma and flavor. Ideal for biryani and pulao.',
  },
  {
    id: 'prod-002',
    name: 'Turmeric Powder',
    category: 'Spices',
    price: 50,
    rating: 4.8,
    deliveryTime: '1 day',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'turmeric powder',
    stock: 1200,
    moq: 100,
    supplierId: 'user-2',
    description: 'Organic turmeric powder with high curcumin content. Sourced from the fields of Erode.',
  },
  {
    id: 'prod-003',
    name: 'Organic Lentils',
    category: 'Grains',
    price: 85,
    rating: 4.3,
    deliveryTime: '3 days',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'organic lentils',
    stock: 800,
    moq: 75,
    supplierId: 'user-3',
    description: 'A mix of organic lentils, rich in protein and fiber. Perfect for a healthy and hearty meal.',
  },
  {
    id: 'prod-004',
    name: 'Coriander Seeds',
    category: 'Spices',
    price: 40,
    rating: 4.6,
    deliveryTime: '2 days',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'coriander seeds',
    stock: 2000,
    moq: 200,
    supplierId: 'user-4',
    description: 'Aromatic coriander seeds, essential for Indian curries and spice blends.',
  },
  {
    id: 'prod-005',
    name: 'Extra Virgin Olive Oil',
    category: 'Oils',
    price: 450,
    rating: 4.9,
    deliveryTime: '4 days',
    imageUrl: 'https://placehold.co/300x200.png',
    dataAiHint: 'olive oil',
    stock: 250,
    moq: 20,
    supplierId: 'user-5',
    description: 'Cold-pressed extra virgin olive oil, perfect for salads and dressings.',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order-101',
    status: 'Delivered',
    date: '2023-10-15',
    total: 3500,
    items: [
      { product: mockProducts[0], quantity: 10 },
      { product: mockProducts[1], quantity: 20 },
    ],
    buyerId: 'user-1',
    supplierId: 'user-2',
  },
  {
    id: 'order-102',
    status: 'Pending',
    date: '2023-11-01',
    total: 1700,
    items: [{ product: mockProducts[2], quantity: 20 }],
    buyerId: 'user-1',
    supplierId: 'user-3',
  },
  {
    id: 'order-103',
    status: 'Live',
    date: '2023-11-05',
    total: 800,
    items: [{ product: mockProducts[3], quantity: 20 }],
    buyerId: 'user-1',
    supplierId: 'user-4',
  },
];

export const mockChatContacts: ChatContact[] = [
  {
    id: 'contact-1',
    name: 'TradeFlow AI',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Hello! How can I help you today?',
    lastMessageTime: '10:42 AM',
    isAi: true,
  },
  {
    id: 'user-1',
    name: 'Anjali Sharma (Buyer)',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'Yes, that sounds good. Please send the quote.',
    lastMessageTime: '9:30 AM',
  },
   {
    id: 'user-2',
    name: 'Raj Patel (Supplier)',
    avatar: 'https://placehold.co/100x100.png',
    lastMessage: 'The new stock of lentils has arrived.',
    lastMessageTime: 'Yesterday',
  },
];

export const mockMessages: Record<string, Message[]> = {
  'user-1': [
     { id: 'msg-u1-1', sender: 'Anjali Sharma', content: 'Hi Raj, do you have any deals on turmeric powder?', timestamp: '9:28 AM', isSender: false },
     { id: 'msg-u1-2', sender: 'You', content: 'Hi Anjali, yes we have a 10% discount for bulk orders over 50kg.', timestamp: '9:29 AM', isSender: true },
     { id: 'msg-u1-3', sender: 'Anjali Sharma', content: 'Yes, that sounds good. Please send the quote.', timestamp: '9:30 AM', isSender: false },
  ],
  'user-2': [
    { id: 'msg-u2-1', sender: 'You', content: 'Hi Raj, when is the new stock of lentils arriving?', timestamp: 'Yesterday', isSender: true },
    { id: 'msg-u2-2', sender: 'Raj Patel', content: 'The new stock of lentils has arrived.', timestamp: 'Yesterday', isSender: false },
  ]
};
