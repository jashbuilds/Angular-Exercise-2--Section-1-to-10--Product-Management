import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormFields } from '../../Models/productSchema.model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { Router } from '@angular/router';
import { ToastDirective } from '../../Directives/toast.directive';
import * as bootstrap from 'bootstrap'

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
  offcanvasDrawer = viewChild<ElementRef>('offcanvasDrawer')
  ngForm = viewChild<NgForm>(NgForm)
  nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput')

  private router = inject(Router)
  productList = inject(ProductListService)

  currentItemId = signal<number | null>(null)
  isOrderConfirmed = signal(false)
  formInputFields = signal<FormFields>({
    name: '',
    email: '',
    contact: null,
    area: '',
    city: '',
    state: ''
  })

  constructor() {
    // Effect will run whenever the offcanvas hides, so Angular can reset the Form.
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
      this.toast()?.show()
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

  // helper function to prevent chars in input
  validateNumber(e: KeyboardEvent) {
    const pattern = /^[0-9]$/;

    if (!pattern.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

  // helper function to validate E-mail ID
  isEmailValid() {
    return this.productList.emailRegExp.test(this.formInputFields().email);
  }

  // Logic to handle submit by resetting Form (show animation and redirect to Home Page)
  handleSubmit() {
    if (this.ngForm()?.valid) {

      const offcanvasElement = this.offcanvasDrawer()?.nativeElement;

      if (offcanvasElement) {
        const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement)
        instance.hide()
        document.body.classList.remove('modal-open', 'offcanvas-open');
        document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
      }

      this.ngForm()?.reset()
      this.isOrderConfirmed.set(true)
      this.cartItems.set([])
      setTimeout(() => {
        this.isOrderConfirmed.set(false)
        this.router.navigate(['/'])
      }, 4000);
    } else {
      this.ngForm()?.form.markAllAsTouched()
    }

  }

  // Helper function to remove Cart Item from Cart.
  removeCartItem() {
    const itemToRemove = this.cartItems().find(item => item.id === this.currentItemId());
    if (itemToRemove) {
      this.productList.cartItems.update(favItems => favItems.filter(favItem => favItem.id !== itemToRemove.id));
    }

    this.toast()?.show()
  }

  onRemoveConfirmation(id: number) {
    this.currentItemId.set(id);
  }

}
