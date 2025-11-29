import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioRegistroComponent } from '../../componentes/formulario-registro/formulario-registro.component';

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [CommonModule, FormularioRegistroComponent],
  templateUrl: './registro-de-cuenta.component.html'
})
export class RegistroDeCuentaPageComponent {}
