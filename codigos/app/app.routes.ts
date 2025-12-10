import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AUTH_ROUTES } from './auth/auth.routes';
import { FEED_ROUTES } from './feed/feed.routes';
import { UPLOAD_ROUTES } from './upload/upload.routes';
import { PROFILE_ROUTES } from './profile/profile.routes';
import { EXPLORE_ROUTES } from './explore/explore.routes';
import { NOTIFICATIONS_ROUTES } from './notifications/notifications.routes';
import { SAVED_ROUTES } from './saved/saved.routes';

export const routes: Routes = [
  // Rutas públicas (sin navbar/sidebar principal)
  {
    path: 'auth',
    children: AUTH_ROUTES,
  },

  // Rutas privadas que usarán el layout principal
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feed',
        children: FEED_ROUTES,
      },
      {
        path: 'upload',
        children: UPLOAD_ROUTES,
      },
      {
        path: 'profile',
        children: PROFILE_ROUTES,
      },
      {
        path: 'explore',
        children: EXPLORE_ROUTES,
      },
      {
        path: 'notifications',
        children: NOTIFICATIONS_ROUTES,
      },
      {
        path: 'saved',
        children: SAVED_ROUTES,
      },
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
    ],
  },

  // Redirección por defecto
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];