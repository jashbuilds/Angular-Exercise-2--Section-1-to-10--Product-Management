import { Injectable, signal } from '@angular/core';
import { Product } from '../Models/productSchema.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor() { }

  favouriteItems = signal<Product[]>([])

  cartItems = signal<Product[]>([])

  itemsList = signal<Product[]>([{
    id: 1,
    category: 'Shoes',
    name: 'Nike Sports Shoes',
    price: 10.99,
    description: 'Stay active and comfortable with our latest sports wear collection.',
    imageUrl: 'images/product1.jpg',
    isLiked: false,
    stock: 200,
    dateAdded: '04/25/2025',
    quantity: 0
  },
  {
    id: 2,
    category: 'Eyewear',
    name: 'RayBan Sunglasses',
    price: 12.99,
    description: 'Elevate your style with our latest collection of sunglasses.',
    imageUrl: 'images/product2.jpg',
    isLiked: false,
    stock: 340,
    dateAdded: '07/10/2025',
    quantity: 0
  },
  {
    id: 3,
    category: 'Electronics',
    name: 'Apple Ipad Pro',
    price: 15.99,
    description: 'Experience the power of technology with our latest gadgets and accessories.',
    imageUrl: 'images/product3.jpg',
    isLiked: false,
    stock: 80,
    dateAdded: '06/20/2025',
    quantity: 0
  },
  {
    id: 4,
    category: 'Clothing',
    name: 'StyleUp Tshirt',
    price: 8.99,
    description: 'Upgrade your wardrobe with our latest collection of fashion and accessories.',
    imageUrl: 'images/product4.jpg',
    isLiked: false,
    stock: 500,
    dateAdded: '05/15/2025',
    quantity: 0 
  },
  {
    id: 5,
    category: 'Sports',
    name: 'Skateboard',
    price: 9.99,
    description: 'Experience the thrill of skateboarding with our latest collection of skateboards and accessories.',
    imageUrl: 'images/product5.jpg',
    isLiked: false,
    stock: 389,
    dateAdded: '01/20/2025',
    quantity: 0
  },
  {
    id: 6,
    category: 'Electronics',
    name: 'PS5 Controller',
    price: 11.99,
    description: 'Experience the ultimate gaming experience with our latest collection of gaming consoles and accessories.',
    imageUrl: 'images/product6.jpg',
    isLiked: false,
    stock: 50,
    dateAdded: '03/30/2024',
    quantity: 0
  },
  {
    id: 7,
    category: 'Electronics',  
    name: 'Wireless Buds',
    price: 13.99,
    description: 'Immerse yourself in sound with our latest collection of wireless TWS earbuds.',
    imageUrl: 'images/product7.jpg',
    isLiked: false,
    stock: 750,
    dateAdded: '04/25/2025',
    quantity: 0
  }, 
  {
    id: 8,
    category: 'Electronics',
    name: 'Smart Watch',
    price: 14.99,
    description: 'Stay connected and track your fitness with our latest collection of smartwatches.',
    imageUrl: 'images/product8.jpg',
    isLiked: false,
    stock: 243,
    dateAdded: '01/01/2025',
    quantity: 0
  }
  ])
}
