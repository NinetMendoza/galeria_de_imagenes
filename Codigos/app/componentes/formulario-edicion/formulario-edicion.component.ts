import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-edicion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-edicion.component.html'
})
export class FormularioEdicionComponent {
  username = '';
  bio = '';
  previewUrl: string | null = null;
  errorUsername: string | null = null;
  errorBio: string | null = null;
  constructor(private router: Router) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.previewUrl = null;
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.errorUsername = null;
    this.errorBio = null;
    const name = this.username?.trim() ?? '';
    if (!name) {
      this.errorUsername = 'El nombre de usuario es obligatorio.';
    } else if (name.length > 20) {
      this.errorUsername = 'El nombre debe tener menos de 20 caracteres.';
    }
    if (this.bio && this.bio.length > 160) {
      this.errorBio = 'La biografía debe tener máximo 160 caracteres.';
    }
    if (!this.errorUsername && !this.errorBio) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Guardando cambios', { username: this.username, bio: this.bio });
      alert('Cambios guardados (demo)');
    }
  }

  onCancel() {
    try {
      this.router.navigate(['/perfil']);
    } catch (e) {
      // ignore in non-browser environments
    }
  }
}
