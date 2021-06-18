import { Injectable } from '@angular/core';
import * as data from '../../assets/data/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: any[] = (data as any).default;

  constructor() { }

  public getList() {
    return this.products;
  }

  public getItemById(id: number) {
    let result = this.products.filter(product => product.id === id);
    return result[0];
  }

  public getListByCategoryId(id: number): any[] {
    let result = this.products.filter(product => product.categoryId === id);
    return result;
  }

  public sortBySaleDate(products: any[]) {
    products.sort((a, b) => Date.parse(b.saleDate) - Date.parse(a.saleDate));
  }

  public sortByTotalBuy(products: any[]) {
    products.sort((a, b) => b.totalBuy - a.totalBuy);
  }

  public getRandomListByCategoryId(id: number) {
    let productListByCategoryId = this.getListByCategoryId(id);
    let shuffled = productListByCategoryId.sort(() => 0.5 - Math.random());
    return shuffled;
  }
}
