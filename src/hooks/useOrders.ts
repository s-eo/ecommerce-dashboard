import { useQuery } from '@tanstack/react-query';
import type { Order } from '../types';

// Mock data for orders with updated customer fields
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    customer: {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      avatar: 'AJ',
      group: 'VIP',
      totalOrders: 12,
      totalSpent: 2450.75,
      location: 'New York',
      country: 'US',
      status: 'Active',
      joinedAt: 'May 24, 2024',
    },
    items: [
      { id: '1', name: 'Wireless Headphones', image: 'https://fakestoreapi.com/img/81fPKd-2h7L._AC_SL1500_.jpg', quantity: 1, price: 99.99 },
      { id: '2', name: 'Phone Case', image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SL1500_.jpg', quantity: 2, price: 19.99 },
    ],
    total: 139.97,
    paymentMethod: 'Credit Card',
    status: 'Processing',
    date: 'May 16, 2024 10:30 AM',
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    customer: {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      avatar: 'BS',
      group: 'Regular',
      totalOrders: 8,
      totalSpent: 1320.40,
      location: 'Los Angeles',
      country: 'US',
      status: 'Active',
      joinedAt: 'May 20, 2024',
    },
    items: [
      { id: '3', name: 'Smart Watch', image: 'https://fakestoreapi.com/img/71pW4hdQVnL._AC_UL640_QL65_ML3_.jpg', quantity: 1, price: 199.99 },
    ],
    total: 199.99,
    paymentMethod: 'PayPal',
    status: 'Delivered',
    date: 'May 15, 2024 2:15 PM',
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    customer: {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      avatar: 'CW',
      group: 'Regular',
      totalOrders: 6,
      totalSpent: 980.00,
      location: 'Chicago',
      country: 'US',
      status: 'Active',
      joinedAt: 'May 14, 2024',
    },
    items: [
      { id: '4', name: 'Laptop Stand', image: 'https://fakestoreapi.com/img/71YXzoO-uL._AC_UL640_QL65_ML3_.jpg', quantity: 1, price: 49.99 },
      { id: '5', name: 'USB Hub', image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', quantity: 1, price: 29.99 },
    ],
    total: 79.98,
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
    date: 'May 14, 2024 9:45 AM',
  },
  {
    id: '4',
    orderNumber: '#ORD-004',
    customer: {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      avatar: 'DB',
      group: 'VIP',
      totalOrders: 15,
      totalSpent: 3240.60,
      location: 'Toronto',
      country: 'CA',
      status: 'Active',
      joinedAt: 'May 18, 2024',
    },
    items: [
      { id: '6', name: 'Mechanical Keyboard', image: 'https://fakestoreapi.com/img/61U7T1lutQ._AC_SY879_.jpg', quantity: 1, price: 149.99 },
    ],
    total: 149.99,
    paymentMethod: 'Credit Card',
    status: 'Delivered',
    date: 'May 13, 2024 4:20 PM',
  },
  {
    id: '5',
    orderNumber: '#ORD-005',
    customer: {
      id: '5',
      name: 'Eva Martinez',
      email: 'eva@example.com',
      avatar: 'EM',
      group: 'New',
      totalOrders: 2,
      totalSpent: 230.50,
      location: 'Miami',
      country: 'US',
      status: 'Inactive',
      joinedAt: 'May 16, 2024',
    },
    items: [
      { id: '7', name: 'Wireless Mouse', image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SL1500_.jpg', quantity: 2, price: 39.99 },
    ],
    total: 79.98,
    paymentMethod: 'PayPal',
    status: 'Cancelled',
    date: 'May 12, 2024 11:00 AM',
  },
  {
    id: '6',
    orderNumber: '#ORD-006',
    customer: {
      id: '6',
      name: 'Frank Wilson',
      email: 'frank@example.com',
      avatar: 'FW',
      group: 'Regular',
      totalOrders: 9,
      totalSpent: 1870.20,
      location: 'Sydney',
      country: 'AU',
      status: 'Active',
      joinedAt: 'May 15, 2024',
    },
    items: [
      { id: '8', name: 'Monitor Arm', image: 'https://fakestoreapi.com/img/71YXzoO-uL._AC_UL640_QL65_ML3_.jpg', quantity: 1, price: 89.99 },
    ],
    total: 89.99,
    paymentMethod: 'Credit Card',
    status: 'Refunded',
    date: 'May 11, 2024 3:30 PM',
  },
  {
    id: '7',
    orderNumber: '#ORD-007',
    customer: {
      id: '7',
      name: 'Grace Lee',
      email: 'grace@example.com',
      avatar: 'GL',
      group: 'VIP',
      totalOrders: 18,
      totalSpent: 4520.80,
      location: 'London',
      country: 'UK',
      status: 'Active',
      joinedAt: 'May 19, 2024',
    },
    items: [
      { id: '9', name: 'Webcam', image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', quantity: 1, price: 79.99 },
      { id: '10', name: 'Microphone', image: 'https://fakestoreapi.com/img/81fPKd-2h7L._AC_SL1500_.jpg', quantity: 1, price: 129.99 },
    ],
    total: 209.98,
    paymentMethod: 'Bank Transfer',
    status: 'Processing',
    date: 'May 10, 2024 1:15 PM',
  },
  {
    id: '8',
    orderNumber: '#ORD-008',
    customer: {
      id: '8',
      name: 'Henry Davis',
      email: 'henry@example.com',
      avatar: 'HD',
      group: 'Regular',
      totalOrders: 7,
      totalSpent: 760.35,
      location: 'Berlin',
      country: 'DE',
      status: 'Active',
      joinedAt: 'May 12, 2024',
    },
    items: [
      { id: '11', name: 'Desk Lamp', image: 'https://fakestoreapi.com/img/71pW4hdQVnL._AC_UL640_QL65_ML3_.jpg', quantity: 1, price: 34.99 },
    ],
    total: 34.99,
    paymentMethod: 'Cash',
    status: 'Delivered',
    date: 'May 9, 2024 10:00 AM',
  },
];

// Simulate API call with delay
const fetchOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
}
