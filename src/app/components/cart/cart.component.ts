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
  public carts: any ;
 // public totalAmount?: number;
  constructor(
    public  cartService : CartService
  ) { }

  ngOnInit(): void {
    this.loadData();
    registerLocaleData(vi);
  }
  loadData(){
  //  this.carts = this.cartService.getCartFromLocalStorage();
    console.log('cart nek: ',this.carts )
    //this.totalAmount = this.cartService.getTotalAmount();
  }
  
  removeProductFromCart(id:string){
    this.loadData();
  }
}
