import { Component, OnInit } from '@angular/core';
import vi from '@angular/common/locales/vi';
import { Order, Product, User } from 'src/app/app.interfaces';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { registerLocaleData } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public user!: User;
  public orders: Order[] = [];
  public pageOfItems: any[] = [];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.orderService.currentOrders$.subscribe(currentOrders => this.orders = currentOrders);
    this.orderService.getCurrentOrdersByUserId(this.user.id);
    this.orderService.sortByBuyDate(this.orders);
    registerLocaleData(vi);
  }

  public onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  public getProductById(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  public cancelAnOrder(id: string): void {
    if (!confirm('Bạn có muốn hủy đơn hàng?')) {
      return;
    }
    this.orderService.cancelAnOrderByOrderId(id);
  }

  public getTempPrice(order: Order): number {
    let tempPrice: number = 0;
    order.productList.forEach(productInOrder => tempPrice += productInOrder.historicalPrice * productInOrder.wantedQuantity);
    return tempPrice;
  }
}
