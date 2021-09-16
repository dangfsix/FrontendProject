import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Cart, Discount, Product } from 'src/app/app.interfaces';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { DiscountService } from 'src/app/services/discount.service';
import { ScriptService } from 'src/app/services/script.service';
import { ToastService } from 'src/app/services/toast.service';

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
  public discounts: Discount[] = [];
  public discountCode: string = '';
  public discountedPrice: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private discountService: DiscountService,
    private scriptService: ScriptService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.cartService.currentCart$.subscribe(cart => this.cart = cart);;
    this.cartService.tempPrice$.subscribe(tempPrice => this.tempPrice = tempPrice);
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.cartService.getCurrentCart();
    this.updatePrices();
    this.discounts = this.discountService.getList();
    registerLocaleData(vi);
    this.scriptService.load();
  }

  // Lấy thông tin sản phẩm theo id
  public getProduct(productId: number): Product {
    return this.productService.getItemById(productId);
  }

  // Xóa 1 sản phẩm ra khỏi cart
  public removeProductFromCart(productId: number): void {
    if (!confirm('Bạn có muốn xóa?')) {
      return;
    }
    this.cartService.removeProductFromCart(productId);
    this.updateDiscountedPrice();
    this.updatePrices();
    this.toastService.show(`Đã xóa sản phẩm ${this.getProduct(productId).name}.`)
  }

  // Thay đổi số lượng sản phẩm
  public changeWantedQuantity(productId: number, wantedQuantity: number): void {
    this.cartService.changeWantedQuantity(productId, wantedQuantity);
    this.updateDiscountedPrice();
    this.updatePrices();
  }

  // Đặt hàng
  public createOrder(): void {
    // Nếu chưa đăng nhập hoặc productList rỗng hoặc chưa chọn hình thức vận chuyển
    if (!this.cart || !this.cart.productList.length || this.deliveryPrice == '0') {
      this.toastService.show('Vui lòng thêm sản phẩm vào giỏ hàng.');
      return;
    } else if (confirm('Bạn có muốn đặt hàng?')) {
      this.orderService.createOrder(this.cart, +this.deliveryPrice, this.discountedPrice);
      this.cartService.removeAllProductFromCart();
      // Reset prices 
      this.deliveryPrice = '10000';
      if (this.discountCode) {
        this.discountCode = '';
        this.discountedPrice = 0;
      }
      this.updatePrices();
      this.toastService.show('Đặt hàng thành công!');
    }
  }

  // Cập nhật giá
  public updatePrices(): void {
    this.cartService.getCurrentCart();
    this.cartService.getTempPrice();
    this.cartService.getTotalPrice(+this.deliveryPrice, this.discountedPrice);
  }

  // Nhập mã giảm giá
  public onSubmitDiscount(): void {
    if (!this.cart || !this.cart.productList.length) {
      this.toastService.show('Vui lòng thêm sản phẩm vào giỏ hàng.')
      return;
    }

    if (this.discountCode === '' && this.discountedPrice === 0) {
      this.toastService.show('Vui lòng không bỏ trống.');
      return;
    }

    if (this.discountCode === '' && this.discountedPrice !== 0) {
      this.toastService.show('Đã xóa mã giảm giá.');
      this.discountedPrice = 0;
      this.updatePrices();
      return;
    }

    let discount: Discount | undefined = this.discounts.find(discount => discount.code === this.discountCode);

    if (!discount) {
      this.toastService.show('Vui lòng điền đúng mã giảm giá.');
      this.discountedPrice = 0;
      this.updatePrices();
      return;
    }

    this.toastService.show(`Đã giảm giá theo mã ${this.discountCode}.`);
    this.discountedPrice = Math.round(this.tempPrice * discount.percent);
    this.updatePrices();
  }

  private updateDiscountedPrice(): void {
    if (this.discountCode && this.discountedPrice !== 0) {
      let discount: Discount | undefined = this.discounts.find(discount => discount.code === this.discountCode);
      if (discount) {
        this.discountedPrice = Math.round(this.tempPrice * discount.percent);
      }
    }
  }
}
