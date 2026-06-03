import { AfterViewInit, Component, computed, inject, signal, viewChild } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { FavoriteItemsComponent } from './favorite-items/favorite-items.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastDirective } from '../../Directives/toast.directive';

@Component({
  selector: 'app-item-list',
  imports: [CurrencyPipe, DatePipe, ToastDirective],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements AfterViewInit {

  toast = viewChild(ToastDirective)

  productList = inject(ProductListService);
  favouriteItemsComponent = viewChild(FavoriteItemsComponent);
  DateNow = signal(Date.now());
  isLoading = signal(true);

  isLiked = signal(false);

  toggleLike(id: number) {
    this.productList.itemsList.update(items =>
      items.map(item =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      )
    );

    const item = this.productList.itemsList().find(item => item.id === id);
    if (item) {
      if (item.isLiked) {
        this.productList.favouriteItems.update(favItems => [...favItems, item])
      } else {
        this.productList.favouriteItems.update(favItems => favItems.filter(favItem => favItem.id !== id));
      }
    }
  }

  addToCart(id: number) {

    this.productList.itemsList.update(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))

    const updatedItem = this.productList.itemsList().find(item => item.id === id);

    if (updatedItem) {
      
      this.productList.cartItems.update(cart => {
        const exists = cart.find(i => i.id === id);
        if (!exists) {
          return [...cart, updatedItem];
        } else {
          return cart.map(i => i.id === id ? updatedItem : i);
        }
      });
      this.toast()?.show()
    }

  }

  sortedProducts = computed(() => {
    const items = this.productList.itemsList();
    return [...items].sort((a, b) => b.dateAdded < a.dateAdded ? -1 : 1);
  });

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
