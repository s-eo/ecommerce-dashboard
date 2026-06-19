import { useQuery } from '@tanstack/react-query';
import type {Customer, CustomerStats} from '../types';

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: 'SW',
    group: 'VIP',
    totalOrders: 12,
    totalSpent: 2450.75,
    location: 'New York',
    country: 'US',
    status: 'Active',
    joinedAt: 'May 24, 2024',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'JS',
    group: 'Regular',
    totalOrders: 8,
    totalSpent: 1320.40,
    location: 'Los Angeles',
    country: 'US',
    status: 'Active',
    joinedAt: 'May 20, 2024',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    avatar: 'ED',
    group: 'VIP',
    totalOrders: 15,
    totalSpent: 3240.60,
    location: 'London',
    country: 'UK',
    status: 'Active',
    joinedAt: 'May 19, 2024',
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    avatar: 'MB',
    group: 'Regular',
    totalOrders: 6,
    totalSpent: 980.00,
    location: 'Toronto',
    country: 'CA',
    status: 'Active',
    joinedAt: 'May 18, 2024',
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    avatar: 'OM',
    group: 'New',
    totalOrders: 2,
    totalSpent: 230.50,
    location: 'Miami',
    country: 'US',
    status: 'Inactive',
    joinedAt: 'May 16, 2024',
  },
  {
    id: '6',
    name: 'Daniel Anderson',
    email: 'daniel.anderson@example.com',
    avatar: 'DA',
    group: 'Regular',
    totalOrders: 9,
    totalSpent: 1870.20,
    location: 'Sydney',
    country: 'AU',
    status: 'Active',
    joinedAt: 'May 15, 2024',
  },
  {
    id: '7',
    name: 'Sophia Taylor',
    email: 'sophia.taylor@example.com',
    avatar: 'ST',
    group: 'New',
    totalOrders: 1,
    totalSpent: 120.00,
    location: 'Berlin',
    country: 'DE',
    status: 'Active',
    joinedAt: 'May 14, 2024',
  },
  {
    id: '8',
    name: 'James Thomas',
    email: 'james.thomas@example.com',
    avatar: 'JT',
    group: 'Regular',
    totalOrders: 7,
    totalSpent: 760.35,
    location: 'Chicago',
    country: 'US',
    status: 'Inactive',
    joinedAt: 'May 12, 2024',
  },
];

// Simulate API call with delay
const fetchCustomers = async (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCustomers);
    }, 500);
  });
};

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
}

export function useCustomerStats() {
  return useQuery<CustomerStats>({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalCustomers: 4892,
            newCustomers: 512,
            repeatCustomers: 1265,
            avgOrderValue: 128.45,
            totalSpent: 628430,
          });
        }, 300);
      });
    },
  });
}
