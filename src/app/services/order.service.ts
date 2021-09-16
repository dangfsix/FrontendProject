import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, Order, ProductInOrder } from '../app.interfaces';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private currentOrders: Order[] = [];
  public currentOrders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  constructor(
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
      buyDate: new Date().toISOString(),
      userId: cart.userId,
      deliveryMethod: (deliveryPrice == 10000) ? 'Giao tiêu chuẩn' : 'Giao nhanh',
      deliveryPrice: deliveryPrice,
      discountedPrice: discountedPrice,
      status: 'active',
      productList: productList
    }

    // Thêm order mới vào orders
    this.orders.push(order);

    // Lưu vào localStorage
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  public sortByBuyDate(orders: Order[]) {
    orders.sort((a, b) => Date.parse(b.buyDate) - Date.parse(a.buyDate));
  }

  public getCurrentOrdersByUserId(userId: number): void {
    this.currentOrders = [];
    this.orders.forEach(order => {
      if (order.userId === userId) {
        this.currentOrders.push(order);
      }
    });
    this.currentOrders$.next(this.currentOrders);
  }

  public cancelAnOrderByOrderId(id: string) {
    this.currentOrders.forEach(order => {
      if (order.id === id) {
        order.status = 'cancelled';
      }
    });
    this.orders.forEach(order => {
      if (order.id === id) {
        order.status = 'cancelled';
      }
    });
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.currentOrders$.next(this.currentOrders);
  }
}
