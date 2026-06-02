import { Component, computed, inject, signal } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-items',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {
  productList = inject(ProductListService)

  cartItems = this.productList.cartItems
  totalAmount = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  })

  increaseQuantity(id: number) {

    const targetData = this.productList.itemsList().find(item => item.id === id)

    if (targetData && targetData?.quantity >= 1) {
      this.productList.itemsList.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      this.productList.cartItems.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    }
  }

  decreaseQuantity(id: number) {

    const targetData = this.productList.itemsList().find(item => item.id === id)

    if (targetData && targetData.quantity > 1) {
      this.productList.itemsList.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      this.productList.cartItems.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    } else if (targetData?.quantity === 1) {
      this.productList.cartItems.update(items => items.filter(item => item.id !== id))
    }
  }

}
