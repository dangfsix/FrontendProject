import { Injectable } from '@angular/core';
import * as data from '../../assets/data/discounts.json';
import { Discount } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discounts: Discount[] = (data as any).default;

  constructor() { }

  public getList(): Discount[] {
    return this.discounts;
  }
}
