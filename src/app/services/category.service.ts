import { Injectable } from '@angular/core';
import * as data from '../../assets/data/categories.json';
import { Category } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = (data as any).default;

  constructor() { }

  public getList(): Category[] {
    return this.categories;
  }

  public getItemById(id: number): Category {
    return this.categories.find(category => category.id === id)!;
  }
}
