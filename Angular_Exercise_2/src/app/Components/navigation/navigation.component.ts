import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductListService } from '../../Services/product-list.service';
import { TooltipDirective } from "../../Directives/tooltip.directive";

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, TooltipDirective],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  productList = inject(ProductListService);
  isMenuCollapsed = signal(true)

  favouriteItems = this.productList.favouriteItems;
  cartItems = this.productList.cartItems
}
