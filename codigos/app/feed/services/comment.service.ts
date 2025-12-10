import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CreateCommentRequest } from '../../core/models/models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  getPostComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?postId=${postId}`);
  }

  addComment(data: CreateCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, data);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }

  likeComment(commentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${commentId}/like`, {});
  }
}
