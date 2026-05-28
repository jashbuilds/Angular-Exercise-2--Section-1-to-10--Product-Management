import { Component, inject } from '@angular/core';
import { ProductListService } from '../../../Services/product-list.service';

@Component({
  selector: 'app-favorite-items',
  imports: [],
  templateUrl: './favorite-items.component.html',
  styleUrl: './favorite-items.component.css'
})
export class FavoriteItemsComponent {
  productList = inject(ProductListService);

  favouriteItems = this.productList.favouriteItems;

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
}
