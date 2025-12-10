import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menuItems = [
    { label: 'Inicio', icon: '🏠', route: '/feed' },
    { label: 'Explorar', icon: '🔍', route: '/explore' },
    { label: 'Guardar', icon: '🔖', route: '/saved' },
    { label: 'Mensajes', icon: '💬', route: '/messages' },
    { label: 'Notificaciones', icon: '🔔', route: '/notifications' },
    { label: 'Mi Perfil', icon: '👤', route: '/profile' },
  ];
}
