import { Component, Input, OnInit } from '@angular/core';
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
  public deliveryPrice: string = '0';
  public tempPrice = this.cartService.getTempPrice();
  public totalPrice = this.cartService.getTotalPrice(Number(this. deliveryPrice));
  public cart: Cart | undefined;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart();
    registerLocaleData(vi);
  }

  // lấy thông tin sản phẩm theo Id
  public getProduct(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  // xóa 1 sản phẩm ra khỏi cart
  public removeProductFromCart(productId: number): void {
    this.cartService.removeProductFromCart(productId);
    this.updateDataFromCart();
  }

  // Thay đổi số lượng sản phẩm
  public saveRange(productId: number, wantedQuantity: number): void {
    this.cartService.changeQuantityProduct(productId, wantedQuantity);
    this.updateDataFromCart();
  }

  // Cập nhật giá nếu như có sự thay đổi ở hình thức toán
  public getDeliveryPrice(){
    this.updateDataFromCart();
  }

  // Đặt hàng
  public orderProduct():void{
    // nếu chưa đăng nhậ(underfine) hoặc productLists rỗng hoặc chưa chọn hình thức thanh toán
    if(this.cart == undefined || !this.cart.productList.length || this.deliveryPrice == '0'){
      alert('Vui lòng đăng nhập, thêm sản phẩm trong giỏ hàng và chọn hình thức thanh toán');
      return;
    }else{
      this.orderService.orderProduct(this.cart, Number(this. deliveryPrice), this.totalPrice);
      this.cartService.removeAllProductFromCart();
      this.updateDataFromCart()
    }
   
  }

  // Cập nhật toàn bộ dữ liệu cho cart khi có bất kì thay đổi(Hàm cập nhật chung)
  public updateDataFromCart(){
    this.tempPrice = this.cartService.getTempPrice();
    this.totalPrice = this.cartService.getTotalPrice(Number(this. deliveryPrice));
    this.cart = this.cartService.getCurrentCart();
  }

}