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