import { Injectable } from '@angular/core';

interface Product {
  productId: number;
  wantedQuantity: number;
}

interface Cart {
  userId: number;
  productList: Array<Product>;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public userID: number = 1;

  constructor() {
  }

  getIdUser(): number {
    return this.userID;
  }

  addProductToCart(productItem: any, wantedQuantity: number) {
    let product: Product = { productId: productItem.id, wantedQuantity: wantedQuantity }
    let productList: Array<Product> = [];
    productList.push(product);
    let cart: Cart = { userId: this.userID, productList: productList }
    let carts: Array<Cart> = [];
    carts.push(cart);
    let listCartTemp = JSON.parse(localStorage.getItem('carts') || "{}");
    if (listCartTemp.length == undefined) {
      // neu carts chua co gi thi them truc tiep vao
      localStorage.setItem('carts', JSON.stringify(carts));
    } else {
      let checkIdUser = listCartTemp.some((cartItem: any) => cartItem.userId === this.userID);
      if (checkIdUser) {
        listCartTemp.forEach((index: any) => {
          if (index.userId === this.userID) {
            let isExist = index.productList.some((cartItem: any) => cartItem.productId === productItem.id);
            if (isExist) {
              index.productList.forEach((item: any) => {
                if (item.productId === productItem.id) {
                  item.wantedQuantity+= wantedQuantity;
                }
              });
            } else {
              index.productList.push(product);
            }
            localStorage.setItem('carts', JSON.stringify(listCartTemp));
          }
        });
      } else {
        listCartTemp.push(cart);
        localStorage.setItem('carts', JSON.stringify(listCartTemp));
      }
    }
  }

  getproductInCart() {
    let listProduct: Array<Product> = [];
    let listCartTemp = JSON.parse(localStorage.getItem('carts') || "{}");
    let checkIdUser = listCartTemp.some((cartItem: any) => cartItem.userId === this.userID);
    if (checkIdUser) {
      listCartTemp.forEach((item: any) => {
        if (item.userId === this.userID) {
          item.productList.forEach((index: any) => {
            listProduct.push(index)
          });
        }
      });
    }
    return listProduct
  }
}
