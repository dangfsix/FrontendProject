import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { Category, Product } from 'src/app/app.interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public category: Category = <Category>{};
  public products: Product[] = [];
  public pageOfItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const categoryId = +this.route.snapshot.params['id'];
    this.category = this.categoryService.getItemById(categoryId);
    this.products = this.productService.getListByCategoryId(categoryId);
    this.productService.sortByTotalBuy(this.products);
    registerLocaleData(vi);
  }

  public onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  public filterSidebar(event: any) {
    this.products = this.categoryService.filterSidebar(event, this.products, this.route);
  }

  public filterSelect(event: any) {
    this.products = this.categoryService.filterSelect(event, this.products, this.route);
  }
}
