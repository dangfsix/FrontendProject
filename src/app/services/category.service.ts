import { Injectable } from '@angular/core';
import * as data from '../../assets/data/categories.json';
import { Category, Product } from '../app.interfaces';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categories: Category[] = (data as any).default;

  constructor(private productService: ProductService) {
  }

  public getList(): Category[] {
    return this.categories;
  }

  public getItemById(id: number): Category {
    return this.categories.find(category => category.id === id)!;
  }

  public removeProductItems(products: Product[]) {
    let inputs: any = document.getElementsByClassName("form-check-input");

    if (this.hasFilterBrand()) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < products.length; j++) {
          if (!inputs[i].checked) {
            let brand = inputs[i].parentElement.lastChild.innerText;
            if (products[j].brand == brand) {
              products.splice(j, 1);
              j--;
            }
          }
        }
      }
    }

    let pr1: any = document.getElementById("checkbox_price_1");
    let pr2: any = document.getElementById("checkbox_price_2");
    let pr3: any = document.getElementById("checkbox_price_3");

    if (this.hasFilterPrice()) {
      if (!pr1.checked) {
        for (let i = 0; i < products.length; i++) {
          if (products[i].price < 1000000) {
            products.splice(i, 1);
            i--;
          }
        }
      }
      if (!pr2.checked) {
        for (let i = 0; i < products.length; i++) {
          if (products[i].price >= 1000000 && products[i].price <= 2000000) {
            products.splice(i, 1);
            i--;
          }
        }
      }
      if (!pr3.checked) {
        for (let i = 0; i < products.length; i++) {
          if (products[i].price > 2000000) {
            products.splice(i, 1);
            i--;
          }
        }
      }
    }
    return products;
  }

  public hasFilterBrand() {
    let inputs: any = document.getElementsByClassName("form-check-input");
    for (let i = 0; i < 4; i++) {
      if (inputs[i].checked) {
        return true;
      }
    }
    return false;
  }

  public hasFilterPrice() {
    let inputs: any = document.getElementsByClassName("form-check-input");
    for (let i = 4; i < 7; i++) {
      if (inputs[i].checked) {
        return true;
      }
    }
    return false;
  }

  public resetProducts(products: Product[], route: ActivatedRoute) {
    products = this.clearProducts(products);
    const categoryId = +route.snapshot.params['id'];
    products = this.productService.getListByCategoryId(categoryId);
    return products;
  }

  public clearProducts(products: Product[]) {
    products.splice(0, products.length);
    return products;
  }

  public filterSidebar(event: any, products: Product[], route: ActivatedRoute) {
    if (event.target.nodeName == "INPUT" || event.target.nodeName == "LABEL") {
      products = this.resetProducts(products, route);
      products = this.removeProductItems(products);
    }
    return products;
  }

  public filterSelect(event: any, products: Product[], route: ActivatedRoute) {
    let formSelect = document.getElementsByClassName("form-select")[0];
    let a = formSelect.getElementsByTagName("option")[0];
    let b = formSelect.getElementsByTagName("option")[1];
    let c = formSelect.getElementsByTagName("option")[2];

    const categoryId = +route.snapshot.params['id'];
    products = this.productService.getListByCategoryId(categoryId);

    if (this.hasFilterBrand() || this.hasFilterPrice()) {
      products = this.removeProductItems(products);
    }

    if (event.target.value == a.value) {
      this.productService.sortByTotalBuy(products);
    } else if (event.target.value == b.value) {
      this.productService.sortBySaleDate(products);
    } else if (event.target.value == c.value) {
      this.productService.sortByHighestRatingScore(products);
    } else {
      this.productService.sortByLowestPrice(products);
    }
    return products;
  }
}
