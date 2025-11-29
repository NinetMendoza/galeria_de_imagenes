import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diseno-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diseno-perfil.component.html'
})
export class DisenoPerfilComponent {
  constructor(private router: Router) {}

  goToEdit() {
    console.log('DisenoPerfil: goToEdit called');
    try {
      const nav = this.router.navigate(['/editar-perfil']);
      // router.navigate may return a Promise
      if (nav && typeof (nav as any).then === 'function') {
        (nav as any).catch(() => {
          // fallback
          if (typeof window !== 'undefined') {
            window.location.href = '/editar-perfil';
          }
        });
      }
    } catch (e) {
      // fallback for environments where Router is not available
      if (typeof window !== 'undefined') {
        window.location.href = '/editar-perfil';
      }
    }
  }
}
