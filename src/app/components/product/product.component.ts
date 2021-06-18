import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public product: any;
  public category: any;
  public productRandom: any;
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
    this.productService.getListProductRandomFromCategory(this.product.categoryId);
    this.productRandom = this.productService.getListProductRandomFromCategory(this.product.categoryId)
    registerLocaleData(vi);
  }
   
 
  addProductToCart(product: any){
    this.cartService.addProductToCart(product);
  }



}
