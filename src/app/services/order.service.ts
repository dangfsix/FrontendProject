import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, Order, ProductInOrder } from '../app.interfaces';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[];
  private orderCurrent: Order[] = [];
  private orderCurrent$:BehaviorSubject<Order[]> =  new BehaviorSubject<Order[]>([]);
 

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }

  public createOrder(cart: Cart, deliveryPrice: number, discountedPrice: number): void {
    let productList: ProductInOrder[] = [];

    // Lấy sản phẩm từ cart ra
    cart.productList.forEach((productInCart) => {
      let productInOrder: ProductInOrder = {
        productId: productInCart.productId,
        wantedQuantity: productInCart.wantedQuantity,
        historicalPrice: this.productService.getItemById(productInCart.productId).price,
      }
      productList.push(productInOrder);
    });

    // Tạo ra 1 order truyền các thông tin của cart hiện tại vào
    let order: Order = {
      id: Math.random().toString().slice(2, 12),
    // buyDate: new Date().toLocaleDateString(), //dd/mm/yyyy
      buyDate: new Date().toISOString().slice(0,10),  // yyyy-mm-dd
      userId: cart.userId,
      deliveryMethod: (deliveryPrice == 10000) ? 'Giao tiêu chuẩn' : 'Giao nhanh',
      deliveryPrice: deliveryPrice,
      discountedPrice: discountedPrice,
      status: "true",
      productList: productList
    }

    // Thêm order mới vào orders
    this.orders.push(order);

    // Lưu vào localStorage
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

    public getCurrentOrderByUserId(userId: Number): Observable<Order[]> {
      this.orders.forEach(order =>{
        if(order.userId == userId && order.status == "true"){
          this.orderCurrent.push(order);
        }
      })
     this.orderCurrent$.next(this.orderCurrent);
     return  this.orderCurrent$;
   }

   public cancelAnOrderByOrderId(id: string){
    this.orderCurrent.forEach((item,index) =>{
      if(item.id == id){
        item.status = "cancelled";
        localStorage.setItem('orders', JSON.stringify(this.orderCurrent));
        this.orderCurrent.splice(index, 1);
      } 
    })
    this.orderCurrent$.next(this.orderCurrent);
  }
}
