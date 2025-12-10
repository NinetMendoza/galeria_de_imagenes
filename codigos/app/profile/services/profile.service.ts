import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, Post } from '../../core/models/models';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/users';

  // Mock data
  private mockUsers: User[] = [
    {
      id: 'user1',
      username: 'juan_fotografia',
      email: 'demo@example.com',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
      bio: 'Amante de la fotografía y la naturaleza',
      followers: 1250,
      following: 320,
      createdAt: new Date(),
    },
    {
      id: 'user2',
      username: 'maria_viajes',
      email: 'maria@example.com',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      bio: 'Viajera del mundo',
      followers: 890,
      following: 450,
      createdAt: new Date(),
    },
    {
      id: 'user3',
      username: 'carlos_chef',
      email: 'carlos@example.com',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
      bio: 'Chef y amante de la comida',
      followers: 2100,
      following: 180,
      createdAt: new Date(),
    },
  ];

  private mockPosts: Post[] = [
    {
      id: '1',
      userId: 'user1',
      user: this.mockUsers[0],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      caption: 'Increíble atardecer en las montañas',
      likes: 4230,
      reactions: [],
      comments: [],
      createdAt: new Date(),
    },
    {
      id: '2',
      userId: 'user1',
      user: this.mockUsers[0],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Naturaleza pura',
      likes: 3120,
      reactions: [],
      comments: [],
      createdAt: new Date(),
    },
    {
      id: '3',
      userId: 'user1',
      user: this.mockUsers[0],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      caption: 'Más momentos increíbles',
      likes: 2890,
      reactions: [],
      comments: [],
      createdAt: new Date(),
    },
  ];

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    // Usar datos mock en lugar de HTTP
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      return of(user).pipe(delay(50));
    }
    return of(this.mockUsers[0]).pipe(delay(50));
  }

  updateProfile(userId: string, data: any): Observable<User> {
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      const updated = { ...user, ...data };
      return of(updated).pipe(delay(50));
    }
    return of(this.mockUsers[0]).pipe(delay(50));
  }

  getUserPosts(userId: string): Observable<Post[]> {
    const userPosts = this.mockPosts.filter(p => p.userId === userId);
    return of(userPosts).pipe(delay(50));
  }

  followUser(userId: string): Observable<any> {
    return of({ success: true }).pipe(delay(50));
  }

  unfollowUser(userId: string): Observable<any> {
    return of({ success: true }).pipe(delay(50));
  }
}
