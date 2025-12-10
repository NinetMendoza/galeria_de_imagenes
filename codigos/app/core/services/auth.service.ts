import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/models';
import { tap, delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  
  // Usuarios mock para desarrollo
  private mockUsers = [
    {
      id: 'user1',
      username: 'juan_fotografia',
      email: 'demo@example.com',
      password: 'password123',
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
      password: 'password123',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      bio: 'Viajera del mundo',
      followers: 890,
      following: 450,
      createdAt: new Date(),
    },
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Si ya hay un usuario guardado, restaurarlo
    const savedUser = this.getUserFromStorage();
    if (savedUser) {
      this.currentUserSubject.next(savedUser);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Búsqueda en usuarios mock
    const user = this.mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    if ((user as any).password !== credentials.password) {
      return throwError(() => new Error('Contraseña incorrecta'));
    }

    // Crear un token fake
    const token = 'mock_token_' + btoa(user.email);
    
    // Simular delay de red
    return of({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt,
      }
    }).pipe(
      delay(800),
      tap((response) => {
        this.setToken(response.token);
        this.currentUserSubject.next(response.user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('current_user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    // Verificar si el email ya existe
    const userExists = this.mockUsers.find(u => u.email === data.email);
    if (userExists) {
      return throwError(() => new Error('El email ya está registrado'));
    }

    // Crear nuevo usuario mock
    const newUser: any = {
      id: 'user_' + Date.now(),
      username: data.username,
      email: data.email,
      password: data.password,
      profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      bio: '',
      followers: 0,
      following: 0,
      createdAt: new Date(),
    };

    this.mockUsers.push(newUser);

    const token = 'mock_token_' + btoa(newUser.email);
    
    return of({
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
        bio: newUser.bio,
        followers: newUser.followers,
        following: newUser.following,
        createdAt: newUser.createdAt,
      }
    }).pipe(
      delay(800),
      tap((response) => {
        this.setToken(response.token);
        this.currentUserSubject.next(response.user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('current_user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_token', token);
    }
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('current_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
