import { Routes } from '@angular/router';
import { ItemListComponent } from './Components/item-list/item-list.component';
import { CartItemsComponent } from './Components/cart-items/cart-items.component';
import { FavoriteItemsComponent } from './Components/item-list/favorite-items/favorite-items.component';

export const routes: Routes = [
    { path: 'items', component: ItemListComponent },
    { path: 'favourites', component: FavoriteItemsComponent },
    { path: 'cart', component: CartItemsComponent },
    { path: '', redirectTo: '/items', pathMatch: 'full' },
];
