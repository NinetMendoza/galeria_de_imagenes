import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Notification } from '../../core/models/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api/notifications';

  private mockNotifications: Notification[] = [
    {
      id: 'notif1',
      userId: 'currentUser',
      fromUser: {
        id: 'user2',
        username: 'maria_viajes',
        email: 'maria@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
        bio: 'Viajera',
        followers: 890,
        following: 450,
        createdAt: new Date(),
      },
      type: 'love',
      postId: 'post1',
      message: 'Le encantó tu publicación',
      read: false,
      createdAt: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 'notif2',
      userId: 'currentUser',
      fromUser: {
        id: 'user3',
        username: 'carlos_chef',
        email: 'carlos@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
        bio: 'Chef',
        followers: 2100,
        following: 180,
        createdAt: new Date(),
      },
      type: 'comment',
      postId: 'post1',
      message: 'Comentó en tu publicación',
      read: false,
      createdAt: new Date(Date.now() - 15 * 60000),
    },
    {
      id: 'notif3',
      userId: 'currentUser',
      fromUser: {
        id: 'user4',
        username: 'sofia_diseño',
        email: 'sofia@example.com',
        profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
        bio: 'Diseñadora',
        followers: 3400,
        following: 250,
        createdAt: new Date(),
      },
      type: 'follow',
      message: 'Empezó a seguirte',
      read: true,
      createdAt: new Date(Date.now() - 60 * 60000),
    },
  ];

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    return of(this.mockNotifications);
  }

  markAsRead(notificationId: string): Observable<any> {
    const notif = this.mockNotifications.find(n => n.id === notificationId);
    if (notif) {
      notif.read = true;
    }
    return of({ success: true });
  }

  deleteNotification(notificationId: string): Observable<any> {
    this.mockNotifications = this.mockNotifications.filter(n => n.id !== notificationId);
    return of({ success: true });
  }
}
