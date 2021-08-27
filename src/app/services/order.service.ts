import { Injectable } from '@angular/core';
import { Cart, Order, ProductInOrder } from '../app.interfaces';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }

  public createOrder(cart: Cart, deliveryPrice: number): void {
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
      buyDate: new Date().toLocaleDateString(),
      userId: cart.userId,
      deliveryMethod: (deliveryPrice == 10000) ? 'Giao tiêu chuẩn' : 'Giao nhanh',
      deliveryPrice: deliveryPrice,
      discountedPrice: 0,
      productList: productList
    }

    // Thêm order mới vào orders
    this.orders.push(order);

    // Lưu vào localStorage
    localStorage.setItem('orders', JSON.stringify(this.orders));
    alert('Đặt hàng thành công');
  }
}