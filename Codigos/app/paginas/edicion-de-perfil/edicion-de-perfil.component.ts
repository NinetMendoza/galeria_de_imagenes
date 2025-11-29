import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioEdicionComponent } from '../../componentes/formulario-edicion/formulario-edicion.component';

@Component({
  selector: 'app-edicion-de-perfil',
  standalone: true,
  imports: [CommonModule, FormularioEdicionComponent],
  templateUrl: './edicion-de-perfil.component.html'
})
export class EdicionDePerfilComponent {}
