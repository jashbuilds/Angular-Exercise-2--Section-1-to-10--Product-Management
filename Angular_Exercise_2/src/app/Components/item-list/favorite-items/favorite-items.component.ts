import { Component, inject, signal, viewChild } from '@angular/core';
import { ProductListService } from '../../../Services/product-list.service';
import { CurrencyPipe } from '@angular/common';
import { TooltipDirective } from '../../../Directives/tooltip.directive';
import { ToastDirective } from '../../../Directives/toast.directive';

@Component({
  selector: 'app-favorite-items',
  imports: [CurrencyPipe, TooltipDirective, ToastDirective],
  templateUrl: './favorite-items.component.html',
  styleUrl: './favorite-items.component.css'
})
export class FavoriteItemsComponent {
  productList = inject(ProductListService);

  toast = viewChild(ToastDirective)

  favouriteItems = this.productList.favouriteItems;

  isListView = signal(true)

  currentItemId = signal<number | null>(null);

  onConfirmation(id: number) {
    const itemToRemove = this.favouriteItems().find(item => item.id === id);
    this.currentItemId.set(itemToRemove?.id || null);
  }

  removeLikedItem() {
    const itemToRemove = this.favouriteItems().find(item => item.id === this.currentItemId());
    
    if (itemToRemove) {
      this.productList.favouriteItems.update(favItems => favItems.filter(favItem => favItem.id !== itemToRemove.id));
      this.productList.itemsList.update(items =>
        items.map(item =>
          item.id === itemToRemove.id ? { ...item, isLiked: false } : item
        )
      );

      this.toast()?.show()
    }
  }

  toggleGridView() {
    this.isListView.set(false);
  }

  toggleListView() {
    this.isListView.set(true);
  }
}
