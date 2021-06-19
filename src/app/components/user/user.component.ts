import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/app.interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User = <User>{};

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
}
