import { Injectable } from '@angular/core';
import * as data from '../../assets/data/users.json';
import { User } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = (data as any).default;
  private userId: number = 1; // Default userId

  constructor() { }

  public getList(): User[] {
    return this.users;
  }

  public getItemById(id: number): User {
    let result = this.users.filter(user => user.id === id);
    return result[0];
  }

  public getCurrentUser(): User {
    let result = this.users.filter(user => user.id === this.userId);
    return result[0];
  }
}
