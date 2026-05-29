import { AfterViewInit, Component, computed, inject, signal, viewChild } from '@angular/core';
import { ProductListService } from '../../Services/product-list.service';
import { FavoriteItemsComponent } from './favorite-items/favorite-items.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-item-list',
  imports: [CurrencyPipe],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements AfterViewInit {
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

  sortedProducts = computed(() => {
    const items = this.productList.itemsList();
    return [...items].sort((a, b) => b.id - a.id);
  });

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
