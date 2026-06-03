export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
    isLiked?: boolean;
    stock: number,
    dateAdded: number | string | Date,
    quantity: number
}

export interface FormFields {
    name: string,
    email: string,
    contact: number | null,
    area: string,
    city: string,
    state: string
}