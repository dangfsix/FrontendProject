import {Component, Input, OnInit} from '@angular/core';
import {Comment, User} from 'src/app/app.interfaces';
import {CommentService} from 'src/app/services/comment.service';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() productId: number = 0;
  public comments: Comment[] = [];
  public userId: number = 0;
  public currentEditCommentId: number = 0;
  public isEdit: boolean = false;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.comments = this.commentService.getListByProductId(this.productId);
    this.commentService.sortByDate(this.comments);
    this.userId = this.userService.getCurrentUser().id;
  }

  public getUser(userId: number): User {
    return this.userService.getItemById(userId);
  }

  public create(): void {
    let commentId = Math.round(Math.random() * 10000000000);
    let userId = this.userService.getCurrentUser().id;
    const productId = +this.route.snapshot.params['id'];
    let ratingScore = document.getElementsByTagName("select")[0].value;
    let commentText = document.getElementsByTagName("textarea")[0].value;
    let date = this.commentService.getDateCreateComment();

    let btnCreate: any = document.getElementById('create-comment');

    if (ratingScore.length == 1 && commentText != '') {
      let cmt: Comment = {
        commentId: commentId,
        userId: userId,
        productId: productId,
        commentText: commentText,
        ratingScore: Number(ratingScore),
        date: date,
      }

      this.commentService.addComment(cmt);
      this.ngOnInit();
      btnCreate.setAttribute('type', 'reset');
      alert('Thêm thành công');

    } else {
      if (ratingScore.length > 1)
        alert('Vui lòng cho sao');
      else if (commentText == '')
        alert('Vui lòng thêm nội dung đánh giá');
      btnCreate.setAttribute('type', '');
    }
  }

  public edit(event: any): void {
    this.currentEditCommentId = event.target.dataset.commentId;
  }

  public submitEdit() {
    let selectEdit: any = document.getElementById('edit-ratingScore');
    let textareaEdit: any = document.getElementById('edit-commentText');

    let ratingScore = selectEdit.value;
    let commentText = textareaEdit.value;

    if (ratingScore.length == 1 && commentText != '') {
      this.commentService.editComment(this.currentEditCommentId, ratingScore, commentText);
      this.ngOnInit();
      alert('Sửa thành công');

    } else if (ratingScore.length > 1)
      alert('Vui lòng cho sao');
    else if (commentText == '')
      alert('Vui lòng thêm nội dung đánh giá');
  }

  public cancelEdit() {
    this.currentEditCommentId = -1;
  }

  public delete(event: any): void {
    let choose = confirm('Xác nhận xoá');
    if (choose) {
      let commentId = event.target.dataset.commentId;
      this.commentService.deleteComment(commentId);
      this.ngOnInit();
    }
  }
}
