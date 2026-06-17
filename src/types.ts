export type Category = 'electronics' | 'clothing' | 'shoes' | 'beauty';

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: Category;
    stock: number;
    image: string;
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