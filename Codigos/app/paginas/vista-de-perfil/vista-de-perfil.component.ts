import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisenoPerfilComponent } from '../../componentes/diseno-perfil/diseno-perfil.component';

@Component({
  selector: 'app-vista-de-perfil',
  standalone: true,
  imports: [CommonModule, DisenoPerfilComponent],
  templateUrl: './vista-de-perfil.component.html'
})
export class VistadePerfilComponent {}
