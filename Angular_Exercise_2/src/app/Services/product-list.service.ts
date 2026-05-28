import { Injectable, signal } from '@angular/core';
import { Product } from '../Models/productSchema.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor() { }

  favouriteItems = signal<Product[]>([])

  itemsList = signal<Product[]>([{
    id: 1,
    category: 'Shoes',
    name: 'Nike Sports Shoes',
    price: 10.99,
    description: 'Stay active and comfortable with our latest sports wear collection.',
    imageUrl: 'images/product1.jpg',
    isLiked: false
  },
  {
    id: 2,
    category: 'Eyewear',
    name: 'RayBan Subglasses',
    price: 12.99,
    description: 'Elevate your style with our latest collection of sunglasses.',
    imageUrl: 'images/product2.jpg',
    isLiked: false
  },
  {
    id: 3,
    category: 'Electronics',
    name: 'Apple Ipad Pro',
    price: 15.99,
    description: 'Experience the power of technology with our latest gadgets and accessories.',
    imageUrl: 'images/product3.jpg',
    isLiked: false
  },
  {
    id: 4,
    category: 'Clothing',
    name: 'StyleUp Tshirt',
    price: 8.99,
    description: 'Upgrade your wardrobe with our latest collection of fashion and accessories.',
    imageUrl: 'images/product4.jpg',
    isLiked: false
  },
  {
    id: 5,
    category: 'Sports',
    name: 'Skateboard',
    price: 9.99,
    description: 'Experience the thrill of skateboarding with our latest collection of skateboards and accessories.',
    imageUrl: 'images/product5.jpg',
    isLiked: false
  },
  {
    id: 6,
    category: 'Electronics',
    name: 'PS5 Controller',
    price: 11.99,
    description: 'Experience the ultimate gaming experience with our latest collection of gaming consoles and accessories.',
    imageUrl: 'images/product6.jpg',
    isLiked: false
  },
  {
    id: 7,
    category: 'Electronics',  
    name: 'Wireless Buds',
    price: 13.99,
    description: 'Immerse yourself in sound with our latest collection of wireless TWS earbuds.',
    imageUrl: 'images/product7.jpg',
    isLiked: false
  }, 
  {
    id: 8,
    category: 'Electronics',
    name: 'Smart Watch',
    price: 14.99,
    description: 'Stay connected and track your fitness with our latest collection of smartwatches.',
    imageUrl: 'images/product8.jpg',
    isLiked: false
  }
  ])
}
