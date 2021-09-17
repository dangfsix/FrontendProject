import { Injectable } from '@angular/core';
import * as data from '../../assets/data/comments.json';
import { Comment } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsJSON: Comment[] = [];
  private commentsAdded: Comment[] = [];
  private commentsDeleted: Comment[] = [];
  private comments: Comment[] = [];

  constructor() {
    this.init();
  }

  public init(): void {
    this.commentsJSON = (data as any).default;
    localStorage.setItem('commentsJSON', JSON.stringify(this.commentsJSON));

    this.refreshComments();
  }

  public getList(): Comment[] {
    return this.comments;
  }

  public refreshComments() {
    this.comments = JSON.parse(localStorage.getItem('commentsJSON') || '[]');

    this.commentsAdded = JSON.parse(localStorage.getItem('added') || '[]');
    if (this.commentsAdded.length != 0)
      this.comments = this.comments.concat(this.commentsAdded);

    this.commentsDeleted = JSON.parse(localStorage.getItem('deleted') || '[]');
    if (this.commentsDeleted.length != 0) {
      for (let i = 0; i < this.commentsDeleted.length; i++) {
        for (let j = 0; j < this.comments.length; j++) {
          if (this.comments[j].commentId == this.commentsDeleted[i].commentId)
            this.comments.splice(j, 1);
        }
      }
    }
  }

  public addComment(cmt: Comment) {
    this.commentsAdded.push(cmt);
    localStorage.setItem('added', JSON.stringify(this.commentsAdded));
    this.refreshComments();
  }

  public editComment(commentId: number, ratingScore: number, commentText: string) {
    let commentNeedToEdit = this.getItemByCommentId(commentId);

    let newCommentId = Math.round(Math.random() * 10000000000);
    let date = this.getDateCreateComment();

    this.commentsDeleted.push(commentNeedToEdit);
    localStorage.setItem('deleted', JSON.stringify(this.commentsDeleted));

    // Tạo mới 1 Comment để thêm vào CommentAdded
    // Thực chất là tạo 1 commentId mới, và giữ nguyên productId và userId
    let cmt = {
      commentId: newCommentId,
      productId: commentNeedToEdit.productId,
      userId: commentNeedToEdit.userId,
      ratingScore: ratingScore,
      commentText: commentText,
      date: date,
    }

    this.addComment(cmt);
  }

  public deleteComment(commentId: number) {
    this.commentsDeleted.push(this.getItemByCommentId(commentId));

    localStorage.setItem('deleted', JSON.stringify(this.commentsDeleted));
    this.refreshComments();
  }

  public getDateCreateComment() {
    let date;
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return date = year + '-' + month + '-' + day;
  }

  public getListByProductId(productId: number): Comment[] {
    return this.comments.filter(comment => comment.productId === productId);
  }

  public getItemByCommentId(commentId: number): Comment {
    return this.comments.find(comment => comment.commentId == commentId)!;
  }

  public sortByDate(comments: Comment[]) {
    comments.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
}
