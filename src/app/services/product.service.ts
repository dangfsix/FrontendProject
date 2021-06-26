import {Injectable} from '@angular/core';
import * as data from '../../assets/data/products.json';
import {Product} from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = (data as any).default;

  constructor() {
  }

  public getList(): Product[] {
    return this.products;
  }

  public getListByCategoryId(id: number): Product[] {
    return this.products.filter(product => product.categoryId === id);
  }

  public getRandomListByCategoryId(id: number): Product[] {
    return this.getListByCategoryId(id).sort(() => 0.5 - Math.random());
  }

  public getItemById(id: number): Product {
    return this.products.find(product => product.id === id)!;
  }

  public sortBySaleDate(products: Product[]) {
    products.sort((a, b) => Date.parse(b.saleDate) - Date.parse(a.saleDate));
  }

  public sortByTotalBuy(products: Product[]) {
    products.sort((a, b) => b.totalBuy - a.totalBuy);
  }

  public sortByLowestPrice(products: Product[]) {
    products.sort((a, b) => a.price - b.price);
  }

  public sortByHighestRatingScore(products: Product[]) {
    products.sort((a, b) => b.ratingScore - a.ratingScore);
  }
}
