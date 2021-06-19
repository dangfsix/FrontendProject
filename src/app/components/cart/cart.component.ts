import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public carts: any;

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    registerLocaleData(vi);
  }

  removeProductFromCart(id: string) {

  }
}
