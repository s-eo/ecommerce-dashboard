export type Category = 'electronics' | 'clothing' | 'shoes' | 'beauty';

export type ProductStatus = 'In Stock' | 'Out of Stock' | 'Low Stock';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    status?: ProductStatus;
}

type UserRole =
    | "admin"
    | "manager"
    | "support"
    | "viewer";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: "active" | "inactive";
    lastLogin: string;
};

export type MetricColor = 'green' | 'blue' | 'purple' | 'orange';
export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export type MetricData = {
    name: WeekDay,
    value: number
}

export type Metric = {
    title: string,
    value: string,
    change: string,
    color: MetricColor,
    data: Array<MetricData>
}

export type OrderStatus = 'Processing' | 'Delivered' | 'Pending' | 'Cancelled' | 'Refunded';
export type PaymentMethod = 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cash';

export type OrderItem = {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
}

export type Customer = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type Order = {
    id: string;
    orderNumber: string;
    customer: Customer;
    items: OrderItem[];
    total: number;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    date: string;
}