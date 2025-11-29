import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDeCuentaComponent as LoginFormComponent } from '../../componentes/login-de-cuenta/login-de-cuenta.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login-de-cuenta.component.html'
})
export class LoginDeCuentaPageComponent {}
