import { Component, inject, signal } from '@angular/core';
import { ProductListService } from '../../../Services/product-list.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-favorite-items',
  imports: [CurrencyPipe, RouterLinkActive],
  templateUrl: './favorite-items.component.html',
  styleUrl: './favorite-items.component.css'
})
export class FavoriteItemsComponent {
  productList = inject(ProductListService);

  favouriteItems = this.productList.favouriteItems;

  isListView = signal(true)

  removeLikedItem(id : number) {
    const itemToRemove = this.favouriteItems().find(item => item.id === id);
    
    if (itemToRemove) {
      this.productList.favouriteItems.update(favItems => favItems.filter(favItem => favItem.id !== itemToRemove.id));
      this.productList.itemsList.update(items =>
        items.map(item =>
          item.id === itemToRemove.id ? { ...item, isLiked: false } : item
        )
      );
    }
  }

  toggleGridView() {
    this.isListView.set(false);
  }

  toggleListView() {
    this.isListView.set(true);
  }
}
