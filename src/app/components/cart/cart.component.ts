import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Cart, Product } from 'src/app/app.interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: Cart | undefined;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart();
    registerLocaleData(vi);
  }

  public getProduct(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  public removeProductFromCart(productId: number): void {
    this.cartService.removeProduct(productId);
  }
}
