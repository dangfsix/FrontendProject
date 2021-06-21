import { Injectable } from '@angular/core';
import { Cart, ProductInCart } from '../app.interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private userId: number = 0;
  private carts: Cart[] = [];
  private currentCart?: Cart;
  constructor(
    private userService: UserService
  ) {
    this.userId = this.userService.getCurrentUser().id;
    this.carts = JSON.parse(localStorage.getItem('carts') || '[]');
  }

  public getCurrentCart(): Cart | undefined {
  //  let carts: Cart[] = JSON.parse(localStorage.getItem('carts') || '[]');
 // let currentCart: Cart | undefined = this.carts.find(cart => cart.userId === this.userId);
  this.currentCart = this.carts.find(cart => cart.userId === this.userId);
    return this.currentCart;
  }

  public addProduct(productId: number, wantedQuantity: number): void {
    // Tạo biến productInCart và mảng productList
    let productInCart: ProductInCart = {
      productId: productId,
      wantedQuantity: wantedQuantity
    }
    let productList: ProductInCart[] = [productInCart];

    // Tạo biến cart và mảng carts
    let cart: Cart = {
      userId: this.userId,
      productList: productList
    }
    let carts: Cart[] = [cart];

    // Tạo biến cartsTemp lấy dữ liệu từ localStorage(carts)
    let cartsTemp: Cart[] = JSON.parse(localStorage.getItem('carts') || '[]');

    // Nếu carts trong localStorage chưa có -> Tạo key carts
    if (cartsTemp.length === 0) {
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      // Lấy ra cart của userId hiện tại
      let currentCart: Cart | undefined = cartsTemp.find(cart => cart.userId === this.userId);

      // Nếu tồn tại cart của userId hiện tại
      if (currentCart) {
        // Lấy ra productInCart của productId hiện tại
        let currentProductInCart: ProductInCart | undefined =
          currentCart?.productList.find(productInCart => productInCart.productId === productId);

        // Nếu tồn tại productInCart của productId hiện tại
        if (currentProductInCart) {
          currentProductInCart.wantedQuantity += wantedQuantity;
        } else {
          currentCart?.productList.push(productInCart);
        }
        localStorage.setItem('carts', JSON.stringify(cartsTemp));
      } else {
        cartsTemp.push(cart);
        localStorage.setItem('carts', JSON.stringify(cartsTemp));
      }
    }
  }

  public removeProduct(productId: number): void {
   // let cartsTemp: Cart[] = JSON.parse(localStorage.getItem('carts') || '[]');
   // let currentCart: Cart | undefined = cartsTemp.find(cart => cart.userId === this.userId);
    this.currentCart?.productList.forEach((element,index)=>{
      if(element.productId === productId) this.currentCart?.productList.splice(index,1);
    });
   localStorage.setItem('carts', JSON.stringify(this.carts));
  }

}