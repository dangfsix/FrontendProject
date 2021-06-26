import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from 'src/app/services/category.service';
import {ProductService} from 'src/app/services/product.service';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {Category, Product} from 'src/app/app.interfaces';

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
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    const categoryId = +this.route.snapshot.params['id'];
    this.category = this.categoryService.getItemById(categoryId);
    this.products = this.productService.getListByCategoryId(categoryId);
    this.productService.sortByTotalBuy(this.products);
    registerLocaleData(vi);
  }

  public onChangePage(pageOfItems: any[]): void {
    this.pageOfItems = pageOfItems;
  }

  public removeProductItems(prod: Product[]) {
    let inputs: any = document.getElementsByClassName("form-check-input");

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < this.products.length; j++) {
        if (!inputs[i].checked) {
          let brand = inputs[i].parentElement.lastChild.innerText;
          if (this.products[j].brand == brand) {
            this.products.splice(j, 1);
            j--;
          }
        }
      }
    }
  }

  public resetProducts() {
    this.clearArr(this.products);
    const categoryId = +this.route.snapshot.params['id'];
    this.products = this.productService.getListByCategoryId(categoryId);
  }

  public clearArr(arr: any[]) {
    arr.splice(0, arr.length);
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

  public filterSidebar(event: any) {
    if (event.target.nodeName == "INPUT" || event.target.nodeName == "LABEL") {
      this.resetProducts();

      if (this.hasFilterBrand()) {
        this.removeProductItems(this.products);
      } else {
        this.resetProducts();
      }
      let pr1: any = document.getElementById("checkbox_price_1");
      let pr2: any = document.getElementById("checkbox_price_2");
      let pr3: any = document.getElementById("checkbox_price_3");

      if (this.hasFilterPrice()) {
        if (!pr1.checked) {
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].price < 1000000) {
              this.products.splice(i, 1);
              i--;
            }
          }
        }
        if (!pr2.checked) {
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].price >= 1000000 && this.products[i].price <= 2000000) {
              this.products.splice(i, 1);
              i--;
            }
          }
        }
        if (!pr3.checked) {
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].price > 2000000) {
              this.products.splice(i, 1);
              i--;
            }
          }
        }
      }
    }
  }

  public filterSelect(event: any) {
    let formSelect = document.getElementsByClassName("form-select")[0];
    let a = formSelect.getElementsByTagName("option")[0];
    let b = formSelect.getElementsByTagName("option")[1];
    let c = formSelect.getElementsByTagName("option")[2];

    this.ngOnInit();
    if (this.hasFilterBrand() || this.hasFilterPrice()) {
      this.removeProductItems(this.products);
    }

    if (event.target.value == a.value) {
      this.productService.sortByTotalBuy(this.products);
    } else if (event.target.value == b.value) {
      this.productService.sortBySaleDate(this.products);
    } else if (event.target.value == c.value) {
      this.productService.sortByHighestRatingScore(this.products);
    } else {
      this.productService.sortByLowestPrice(this.products);
    }
  }
}
