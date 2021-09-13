import { Component, OnInit } from '@angular/core';
import vi from '@angular/common/locales/vi';
import { Order, Product, ProductInOrder, User } from 'src/app/app.interfaces';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { registerLocaleData } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private userId: number = 1; // Default user
  public orders: Order[] | undefined;
  public userInfor?: User;
  public  pageOfItems: any[] = [];
  public items: ProductInOrder[] | any = [];
  public productList: ProductInOrder[] = [];


  constructor(private orderService: OrderService, private userService: UserService, private productService: ProductService) {
   }

  ngOnInit(): void {
    this.orderService.orderCurrent$.subscribe((orders: Order[]) => {this.orders = orders; this.items = orders});
    this.userInfor = this.userService.getItemById(this.userId);
    registerLocaleData(vi);
  }

  public onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  public getProductById(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  public cancelAnOrder(id: string): void{
    if(!confirm('Bạn có muốn hủy đơn hàng')){
      return;
    }
    this.orderService.cancelAnOrderByOrderId(id);
  }

  public getTempPrice(order: Order): number | undefined{
    let tempPrice: number = 0;
    order.productList.forEach(item => tempPrice += item.historicalPrice * item.wantedQuantity)
      return tempPrice;
   }
 
}
