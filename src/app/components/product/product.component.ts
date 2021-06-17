import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/app.interfaces';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public product: Product = <Product>{};
  public category: Category = <Category>{};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];
    this.product = this.productService.getItemById(productId);
    this.category = this.categoryService.getItemById(this.product.categoryId);
  }
}
