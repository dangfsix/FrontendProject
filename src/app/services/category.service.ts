import { Injectable } from '@angular/core';
import * as data from '../../assets/data/categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: any[] = (data as any).default;

  constructor() { }

  public getList() {
    return this.categories;
  }

  public getItemById(id: number) {
    let result = this.categories.filter(category => category.id === id);
    return result[0];
  }
}
