import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/models';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  private apiUrl = 'http://localhost:3000/api/saved';
  private savedPostIds = new Set<string>();

  constructor(private http: HttpClient) {}

  getSavedPosts(): Observable<Post[]> {
    // Mock de posts guardados
    const savedPosts: Post[] = [
      {
        id: 'saved1',
        userId: 'user1',
        user: {
          id: 'user1',
          username: 'juan_fotografia',
          email: 'juan@example.com',
          profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
          bio: 'Fotógrafo',
          followers: 1250,
          following: 320,
          createdAt: new Date(),
        },
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
        caption: 'Atardecer hermoso',
        likes: 5230,
        reactions: [],
        comments: [],
        isSaved: true,
        createdAt: new Date(),
      },
    ];
    return of(savedPosts);
  }

  savePost(postId: string): Observable<any> {
    this.savedPostIds.add(postId);
    return of({ success: true });
  }

  unsavePost(postId: string): Observable<any> {
    this.savedPostIds.delete(postId);
    return of({ success: true });
  }

  isSaved(postId: string): boolean {
    return this.savedPostIds.has(postId);
  }
}
