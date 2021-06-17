import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Category, Product } from 'src/app/app.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories: Category[] = [];
  public products: Product[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getList();
    this.products = this.productService.getList();
    this.productService.sortBySaleDate(this.products);
    // Thêm tính năng format số kiểu tiếng Việt
    registerLocaleData(vi);
  }
}
