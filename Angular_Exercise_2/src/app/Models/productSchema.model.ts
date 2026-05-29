export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
    isLiked?: boolean;
    stock: number
}