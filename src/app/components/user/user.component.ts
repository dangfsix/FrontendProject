import { Component, OnInit } from '@angular/core';
import { Order, User } from 'src/app/app.interfaces';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User = <User>{};
  public  totalProductInCart:number = 0;
  public  totalOrder:number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService 
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.cartService.totalProduct$.subscribe(totalProductInCart => this.totalProductInCart = totalProductInCart)
    this.orderService.currentOrders$.subscribe((orders: Order[]) => {
      let totalOrder = 0; 
      orders.forEach(element => {
      if(element.status == "active") totalOrder++;
       });
      this.totalOrder = totalOrder
    });
    this.orderService.getCurrentOrdersByUserId(this.user.id);
    this.cartService.getCurrentCart();
  }
}
