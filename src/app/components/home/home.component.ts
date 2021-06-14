import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories: any[] = [];
  public products: any[] = [];

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

  // Hàm lấy ra 12 sản phẩm mới nhất
  public getNewestProducts(): any[] {
    let newestProducts: any[] = [];
    for (let i = 0; i < 12; i++) {
      newestProducts.push(this.products[i]);
    }
    return newestProducts;
  }
}
