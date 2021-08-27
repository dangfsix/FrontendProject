import { Component, Input, OnInit } from '@angular/core';
import { Comment, User } from 'src/app/app.interfaces';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() productId: number = 0;
  public comments: Comment[] = [];
  public userId: number = 0;

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.comments = this.commentService.getListByProductId(this.productId);
    this.commentService.sortByDate(this.comments);
    this.userId = this.userService.getCurrentUser().id;
  }

  public getUser(userId: number): User {
    return this.userService.getItemById(userId);
  }

  public create(): void {
    console.log('Create');
  }

  public edit(event: any): void {
    console.log('Edit');
    console.log(event.target.dataset.commentId);
  }

  public delete(event: any): void {
    console.log('Delete');
    console.log(event.target.dataset.commentId);
  }
}
