import { Injectable } from '@angular/core';
import * as data from '../../assets/data/products.json';
import { Product } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = (data as any).default;

  constructor() { }

  public getList(): Product[] {
    return this.products;
  }

  public getListByCategoryId(id: number): Product[] {
    let result = this.products.filter(product => product.categoryId === id);
    return result;
  }

  public getItemById(id: number): Product {
    let result = this.products.filter(product => product.id === id);
    return result[0];
  }

  public sortBySaleDate(products: Product[]) {
    products.sort((a, b) => Date.parse(b.saleDate) - Date.parse(a.saleDate));
  }

  public sortByTotalBuy(products: Product[]) {
    products.sort((a, b) => b.totalBuy - a.totalBuy);
  }
}
