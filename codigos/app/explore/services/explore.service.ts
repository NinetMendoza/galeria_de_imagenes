import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post, User } from '../../core/models/models';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  private apiUrl = 'http://localhost:3000/api/explore';

  // Mock data para featured posts
  private mockFeaturedPosts: Post[] = [];

  constructor(private http: HttpClient) {
    this.initializeMockData();
  }

  private initializeMeaturedPosts(): void {
    // Se inicializa en initializeMockData
  }

  private initializeMockData(): void {
    const mockUsers = [
      {
        id: 'user1',
        username: 'juan_fotografia',
        email: 'juan@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
        bio: 'Amante de la fotografía',
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
        bio: 'Chef apasionado',
        followers: 2100,
        following: 180,
        createdAt: new Date(),
      },
    ];

    this.mockFeaturedPosts = [
      {
        id: 'trending1',
        userId: 'user1',
        user: mockUsers[0],
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
        caption: 'Atardecer espectacular 🌅',
        likes: 5230,
        reactions: [],
        comments: [],
        createdAt: new Date(),
      },
      {
        id: 'trending2',
        userId: 'user2',
        user: mockUsers[1],
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop',
        caption: 'Viajando por Asia 🌏',
        likes: 4890,
        reactions: [],
        comments: [],
        createdAt: new Date(),
      },
      {
        id: 'trending3',
        userId: 'user3',
        user: mockUsers[2],
        image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop',
        caption: 'Cocinando con pasión 👨‍🍳',
        likes: 6120,
        reactions: [],
        comments: [],
        createdAt: new Date(),
      },
    ];
  }

  getTrendingPosts(): Observable<Post[]> {
    return of(this.mockFeaturedPosts);
  }

  getSuggestedUsers(): Observable<User[]> {
    const users: User[] = [
      {
        id: 'user4',
        username: 'sofia_diseño',
        email: 'sofia@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
        bio: 'Diseñadora gráfica',
        followers: 3400,
        following: 250,
        createdAt: new Date(),
      },
      {
        id: 'user5',
        username: 'alex_musica',
        email: 'alex@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        bio: 'Productor musical',
        followers: 2800,
        following: 180,
        createdAt: new Date(),
      },
      {
        id: 'user6',
        username: 'laura_fitness',
        email: 'laura@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laura',
        bio: 'Entrenadora fitness',
        followers: 4100,
        following: 320,
        createdAt: new Date(),
      },
    ];
    return of(users);
  }
}
