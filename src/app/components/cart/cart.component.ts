import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Cart, Product } from 'src/app/app.interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public deliveryPrice: string = '10000';
  public tempPrice: number = 0;
  public totalPrice: number = 0;
  public cart: Cart | undefined;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart();
    this.updatePrices();
    registerLocaleData(vi);
  }

  // Lấy thông tin sản phẩm theo id
  public getProduct(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  // Xóa 1 sản phẩm ra khỏi cart
  public removeProductFromCart(productId: number): void {
    this.cartService.removeProductFromCart(productId);
    this.updatePrices();
  }

  // Thay đổi số lượng sản phẩm
  public changeWantedQuantity(productId: number, wantedQuantity: number): void {
    this.cartService.changeWantedQuantity(productId, wantedQuantity);
    this.updatePrices();
  }

  // Đặt hàng
  public createOrder(): void {
    // Nếu chưa đăng nhập hoặc productList rỗng hoặc chưa chọn hình thức vận chuyển
    if (this.cart == undefined || !this.cart.productList.length || this.deliveryPrice == '0') {
      alert('Vui lòng đăng nhập, thêm sản phẩm trong giỏ hàng và chọn hình thức vận chuyển.');
      return;
    } else {
      this.orderService.createOrder(this.cart, +this.deliveryPrice);
      this.cartService.removeAllProductFromCart();
      this.updatePrices();
    }
  }

  // Cập nhật giá
  public updatePrices() {
    this.tempPrice = this.cartService.getTempPrice();
    this.totalPrice = this.cartService.getTotalPrice(+this.deliveryPrice);
  }
}
