import { Injectable } from '@angular/core';

interface ProductInCart {
  productId: number;
  wantedQuantity: number;
}

interface Cart {
  userId: number;
  productList: ProductInCart[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private userId: number = 1;

  constructor() { }

  public getUserId(): number {
    return this.userId;
  }

  public addProduct(product: any, wantedQuantity: number): void {
    // Tạo biến productInCart và mảng productList
    let productInCart: ProductInCart = {
      productId: product.id,
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
          currentCart?.productList.find(productInCart => productInCart.productId === product.id);

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

    // Test
    console.log('carts:', localStorage.getItem('carts'));
  }

  getproductInCart() {
    let productList: Array<ProductInCart> = [];
    let cartsTemp = JSON.parse(localStorage.getItem('carts') || '[]');
    let checkUserId = cartsTemp.some((cart: any) => cart.userId === this.userId);
    if (checkUserId) {
      cartsTemp.forEach((item: any) => {
        if (item.userId === this.userId) {
          item.productList.forEach((cart: any) => {
            productList.push(cart)
          });
        }
      });
    }
    return productList
  }
}
