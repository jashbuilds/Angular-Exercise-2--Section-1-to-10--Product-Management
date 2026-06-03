import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormFields } from '../../Models/productSchema.model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Router } from '@angular/router';
import { ToastDirective } from '../../Directives/toast.directive';

@Component({
  selector: 'app-cart-items',
  imports: [CurrencyPipe, FormsModule, LottieComponent, ToastDirective],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {

  options: AnimationOptions = {
    path: '/assets/order-confirmation-animation-2.json',
  }

  toast = viewChild(ToastDirective)

  private router = inject(Router)


  isOrderConfirmed = signal(false)

  offcanvasDrawer = viewChild<ElementRef>('offcanvasDrawer')
  ngForm = viewChild<NgForm>(NgForm)
  productList = inject(ProductListService)

  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput')

  constructor() {
    effect((onCleanup) => {
      const offCanvas = this.offcanvasDrawer()?.nativeElement;

      if (offCanvas) {
        const handleHidden = () => {
          this.ngForm()?.reset()
        }

        offCanvas.addEventListener('hidden.bs.offcanvas', handleHidden);

        onCleanup(() => {
          offCanvas.removeEventListener('hidden.bs.offcanvas', handleHidden);
        })
      }
    })
  }

  formInputFields = signal<FormFields>({
    name: '',
    email: '',
    contact: null,
    area: '',
    city: '',
    state: ''
  })

  cartItems = this.productList.cartItems
  totalAmount = computed(() => {
    return this.cartItems().reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  })

  // Helper function to Increase the Quantity
  increaseQuantity(id: number) {

    const targetData = this.productList.itemsList().find(item => item.id === id)

    if (targetData && targetData?.quantity >= 1) {
      this.productList.itemsList.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
      this.productList.cartItems.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    }
  }

  // Helper function to Decrease the Quantity
  decreaseQuantity(id: number) {

    const targetData = this.productList.itemsList().find(item => item.id === id)

    if (targetData && targetData.quantity > 1) {
      this.productList.itemsList.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      this.productList.cartItems.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    } else if (targetData?.quantity === 1) {
      this.productList.cartItems.update(items => items.filter(item => item.id !== id))
    }
  }

  // Helper function that detects Manual change in quantity and recalculate 'Total' Accordingly
  onManualChange(id: number, newValue: string) {

    const quantity = parseInt(newValue);

    if (quantity >= 1) {

      this.productList.cartItems.update(items =>
        items.map(item => item.id === id ? { ...item, quantity: quantity } : item)
      );
    } else {
      this.removeCartItem()
    }
  }

  validateNumber(e: KeyboardEvent) {
    const pattern = /^[0-9]$/;

    if (!pattern.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

  isEmailValid() {
    return this.productList.emailRegExp.test(this.formInputFields().email);
  }

  handleSubmit() {
    this.ngForm()?.reset()
    this.isOrderConfirmed.set(true)
    this.cartItems.set([])

    setTimeout(() => {
      this.isOrderConfirmed.set(false)
      this.router.navigate(['/'])
    }, 5000);
  }


  removeCartItem() {
    const itemToRemove = this.cartItems().find(item => item.id === this.currentItemId());
    if (itemToRemove) {
      this.productList.cartItems.update(favItems => favItems.filter(favItem => favItem.id !== itemToRemove.id));
    }

    this.toast()?.show()
  }

  currentItemId = signal<number | null>(null)

  onRemoveConfirmation(id: number) {
    this.currentItemId.set(id);
  }

}
