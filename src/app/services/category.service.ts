import {Injectable} from '@angular/core';
import * as data from '../../assets/data/categories.json';
import {Category, Product} from '../app.interfaces';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./product.service";

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

  public removeProductItems(prod: Product[]) {
    let inputs: any = document.getElementsByClassName("form-check-input");

    if (this.hasFilterBrand()) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < prod.length; j++) {
          if (!inputs[i].checked) {
            let brand = inputs[i].parentElement.lastChild.innerText;
            if (prod[j].brand == brand) {
              prod.splice(j, 1);
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
        for (let i = 0; i < prod.length; i++) {
          if (prod[i].price < 1000000) {
            prod.splice(i, 1);
            i--;
          }
        }
      }
      if (!pr2.checked) {
        for (let i = 0; i < prod.length; i++) {
          if (prod[i].price >= 1000000 && prod[i].price <= 2000000) {
            prod.splice(i, 1);
            i--;
          }
        }
      }
      if (!pr3.checked) {
        for (let i = 0; i < prod.length; i++) {
          if (prod[i].price > 2000000) {
            prod.splice(i, 1);
            i--;
          }
        }
      }
    }
    return prod;
  }

  public resetProducts(prod: Product[], route: ActivatedRoute) {
    prod = this.clearProducts(prod);
    const categoryId = +route.snapshot.params['id'];
    prod = this.productService.getListByCategoryId(categoryId);
    return prod;
  }

  public clearProducts(prod: Product[]) {
    prod.splice(0, prod.length);
    return prod;
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

  public filterSidebar(event: any, prod: Product[], route: ActivatedRoute) {
    if (event.target.nodeName == "INPUT" || event.target.nodeName == "LABEL") {
      prod = this.resetProducts(prod, route);
      prod = this.removeProductItems(prod);
    }
    return prod;
  }

  public filterSelect(event: any, prod: Product[], route: ActivatedRoute) {
    let formSelect = document.getElementsByClassName("form-select")[0];
    let a = formSelect.getElementsByTagName("option")[0];
    let b = formSelect.getElementsByTagName("option")[1];
    let c = formSelect.getElementsByTagName("option")[2];

    const categoryId = +route.snapshot.params['id'];
    prod = this.productService.getListByCategoryId(categoryId);

    if (this.hasFilterBrand() || this.hasFilterPrice()) {
      prod = this.removeProductItems(prod);
    }

    if (event.target.value == a.value) {
      this.productService.sortByTotalBuy(prod);
    } else if (event.target.value == b.value) {
      this.productService.sortBySaleDate(prod);
    } else if (event.target.value == c.value) {
      this.productService.sortByHighestRatingScore(prod);
    } else {
      this.productService.sortByLowestPrice(prod);
    }
    return prod;
  }
}
