import { Injectable } from '@angular/core';
import * as data from '../../assets/data/comments.json';
import { Comment } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];

  constructor() {
    this.init();
  }

  private init(): void {
    let commentsJSON: Comment[] = (data as any).default;
    localStorage.setItem('comments', JSON.stringify(commentsJSON));
    this.comments = JSON.parse(localStorage.getItem('comments') || '[]');
  }

  public getList(): Comment[] {
    return this.comments;
  }

  public getListByProductId(productId: number): Comment[] {
    return this.comments.filter(comment => comment.productId === productId);
  }

  public getItemByCommentId(commentId: number): Comment {
    return this.comments.find(comment => comment.commentId === commentId)!;
  }

  public sortByDate(comments: Comment[]) {
    comments.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
}
