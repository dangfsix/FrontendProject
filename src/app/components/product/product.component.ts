import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/app.interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product: Product = <Product>{};
  public category: Category = <Category>{};
  public relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const productId = +this.route.snapshot.params['id'];
    this.product = this.productService.getItemById(productId);
    this.category = this.categoryService.getItemById(this.product.categoryId);
    this.relatedProducts = this.productService.getRandomListByCategoryId(this.product.categoryId).slice(0, 4);
    registerLocaleData(vi);
  }

  public addProductToCart(productId: number, wantedQuantity: number): void {
    this.cartService.addProduct(productId, wantedQuantity);
  }
}
