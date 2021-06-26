import {Injectable} from '@angular/core';
import * as data from '../../assets/data/categories.json';
import {Category, Product} from '../app.interfaces';
import {ProductComponent} from "../components/product/product.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";
import {CategoryComponent} from "../components/category/category.component";
import {registerLocaleData} from "@angular/common";
import vi from "@angular/common/locales/vi";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Category[] = (data as any).default;

  constructor() {

    // const categoryId = +this.route.snapshot.params['id'];
    // this.category = this.getItemById(categoryId);
    // this.products = this.productService.getListByCategoryId(categoryId);
    // this.productService.sortByTotalBuy(this.products);
    // registerLocaleData(vi);

  }

  public getList(): Category[] {
    return this.categories;
  }

  public getItemById(id: number): Category {
    return this.categories.find(category => category.id === id)!;
  }


}
