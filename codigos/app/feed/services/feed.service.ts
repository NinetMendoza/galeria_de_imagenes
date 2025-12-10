import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../../core/models/models';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private apiUrl = 'http://localhost:3000/api/posts';

  private mockPosts: Post[] = [
    {
      id: '1',
      userId: 'user1',
      user: {
        id: 'user1',
        username: 'juan_fotografia',
        email: 'juan@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
        bio: 'Amante de la fotografía y la naturaleza',
        followers: 1250,
        following: 320,
        createdAt: new Date(),
      },
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
      caption: 'Increíble atardecer en las montañas. La naturaleza nos sorprende cada día con su belleza incomparable. 🌅📸',
      likes: 4230,
      reactions: [],
      comments: [],
      createdAt: new Date(),
      isLiked: false,
    },
    {
      id: '2',
      userId: 'user2',
      user: {
        id: 'user2',
        username: 'maria_viajes',
        email: 'maria@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
        bio: 'Viajera del mundo',
        followers: 890,
        following: 450,
        createdAt: new Date(),
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      caption: 'Explorando nuevas ciudades y culturas. Cada viaje es una nueva aventura llena de aprendizaje. 🌍✈️',
      likes: 3450,
      reactions: [],
      comments: [],
      createdAt: new Date(),
      isLiked: false,
    },
    {
      id: '3',
      userId: 'user3',
      user: {
        id: 'user3',
        username: 'carlos_chef',
        email: 'carlos@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        bio: 'Chef y amante de la comida',
        followers: 2100,
        following: 180,
        createdAt: new Date(),
      },
      image: 'https://images.unsplash.com/photo-1495962066316-f82f859e7ccb?w=500&h=500&fit=crop',
      caption: 'Cocinando con amor y dedicación. La gastronomía es un arte que conecta corazones. 👨‍🍳❤️',
      likes: 5670,
      reactions: [],
      comments: [],
      createdAt: new Date(),
      isLiked: false,
    },
  ];

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, limit: number = 10): Observable<{ posts: Post[]; total: number }> {
    return of({
      posts: this.mockPosts,
      total: this.mockPosts.length,
    }).pipe(delay(200));
  }

  getPostById(postId: string): Observable<Post> {
    const post = this.mockPosts.find(p => p.id === postId);
    return of(post || this.mockPosts[0]).pipe(delay(200));
  }

  likePost(postId: string): Observable<any> {
    return of({ success: true }).pipe(delay(100));
  }

  unlikePost(postId: string): Observable<any> {
    return of({ success: true }).pipe(delay(100));
  }
}
