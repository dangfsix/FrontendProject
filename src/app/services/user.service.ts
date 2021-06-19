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
    return this.users.find(user => user.id === id)!;
  }

  public getCurrentUser(): User {
    return this.users.find(user => user.id === this.userId)!;
  }
}
