import { Injectable } from '@angular/core';
import { Cart, Order, ProductItemInOrder } from '../app.interfaces';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[];

  constructor( private cartService: CartService,private productService: ProductService) {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
   }

  public orderProduct(cart: Cart, deliveryPrice: number, totalPrice: number):void{
    let productList: ProductItemInOrder[] = [];

    // lấy sản phẩm từ cart ra
    cart.productList.forEach((element) => {
      let productItem: ProductItemInOrder = {
        wantedQuantity: element.wantedQuantity,
        productId: element.productId,
        historicalPrice: this.productService.getItemById(element.productId).price,
      }
      productList.push(productItem);
    });

    // tạo ra 1 order truyền các thông tin của cart hiện tại vào
     let order: Order = {
       id: Math.floor(Math.random()*8+1)+Math.random().toString().slice(2,10),
       buyDate: new Date().toLocaleDateString(),
       userId: cart.userId,
       deliveryMethod: (deliveryPrice == 10000) && 'Giao tiêu chuẩn' || 'Giao nhanh',
       deliveryPrice: deliveryPrice,
       totalPrice: totalPrice,
       productList: productList
     }

     //thêm order mới vào orders
     this.orders.push(order);

     // lưu vào localStorage
     localStorage.setItem('orders', JSON.stringify(this.orders));
     alert('Đặt hàng thành công')
  }

}
