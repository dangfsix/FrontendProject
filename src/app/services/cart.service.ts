import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, ProductInCart } from '../app.interfaces';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private userId: number = 0;
  private carts: Cart[] = [];
  private currentCart?: Cart;

  public currentCart$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public tempPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalPrice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    this.userId = this.userService.getCurrentUser().id;
    this.carts = JSON.parse(localStorage.getItem('carts') || '[]');
  }

  public getCurrentCart(): Observable<Cart> {
    this.currentCart = this.carts.find(cart => cart.userId === this.userId);
    this.currentCart$.next(this.currentCart);
    this.getTotalProduct();
    return this.currentCart$;
  }

  public addProduct(productId: number, wantedQuantity: number): void {
    // Tạo biến productInCart và mảng productList
    let productInCart: ProductInCart = {
      productId: productId,
      wantedQuantity: wantedQuantity
    }
    let productList: ProductInCart[] = [productInCart];

    // Tạo biến cart
    let cart: Cart = {
      userId: this.userId,
      productList: productList
    }

    // Nếu carts trong localStorage chưa có -> Tạo key carts
    if (this.carts.length === 0) {
      this.carts = [cart];
      this.getCurrentCart();
    } else {
      this.getCurrentCart();
      // Nếu tồn tại cart của userId hiện tại
      if (this.currentCart) {
        // Lấy ra productInCart của productId hiện tại
        let currentProductInCart: ProductInCart | undefined =
          this.currentCart?.productList.find(productInCart => productInCart.productId === productId);

        // Nếu tồn tại productInCart của productId hiện tại
        if (currentProductInCart) {
          currentProductInCart.wantedQuantity += wantedQuantity;
        } else {
          this.currentCart?.productList.push(productInCart);
        }
      } else {
        this.carts.push(cart);
      }
    }
    // Cập nhật lại currentCart cho những nơi nó đăng kí
    this.currentCart$.next(this.currentCart);
    // Cập nhật lại số lượng
    this.getTotalProduct();
    // Lưu dữ liệu cartsTemp vào key carts
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  public changeWantedQuantity(productId: number, wantedQuantity: number): void {
    let currentCart = this.currentCart;
    let currentProductInCart: ProductInCart | undefined =
      currentCart?.productList.find(productInCart => productInCart.productId === productId);
    if (currentProductInCart) {
      currentProductInCart.wantedQuantity = wantedQuantity
    }
    // Cập nhật lại số lượng
    this.getTotalProduct();
    localStorage.setItem('carts', JSON.stringify(this.carts))
  }

  public removeProductFromCart(productId: number): void {
    this.currentCart?.productList.forEach((productInCart, index) => {
      if (productInCart.productId === productId) this.currentCart?.productList.splice(index, 1);
    });
    localStorage.setItem('carts', JSON.stringify(this.carts));
    this.currentCart$.next(this.currentCart);
    // Cập nhật lại số lượng
    this.getTotalProduct();
  }

  // Xóa tất cả sản phẩm của user hiện tại đang đăng nhập
  public removeAllProductFromCart() {
    this.currentCart!.productList = [];
    this.currentCart$.next(this.currentCart);
    localStorage.setItem('carts', JSON.stringify(this.carts));
    // Cập nhật lại số lượng
    this.getTotalProduct();
  }

  public getTempPrice(): number {
    let tempPrice = 0;
    if (this.currentCart) {
      this.currentCart?.productList.forEach(productInCart => {
        let product = this.productService.getItemById(productInCart.productId);
        tempPrice += product.price * productInCart.wantedQuantity;
      });
    }
    this.tempPrice$.next(tempPrice)
    return tempPrice;
  }

  public getTotalPrice(deliveryPrice: number, discountedPrice: number) {
    let totalPrice = this.getTempPrice() + deliveryPrice - discountedPrice;
    this.totalPrice$.next(totalPrice)
  }

  public getTotalProduct() {
    let count: number = 0;
    this.currentCart?.productList.forEach(item => {
      count += item.wantedQuantity;
    })
    // Cập nhật số lượng
    this.totalProduct$.next(count);
  }
}
