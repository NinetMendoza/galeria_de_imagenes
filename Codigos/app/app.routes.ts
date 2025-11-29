import { Routes } from '@angular/router';
import { RegistroDeCuentaPageComponent } from './paginas/registro-de-cuenta/registro-de-cuenta.component';
import { LoginDeCuentaPageComponent } from './paginas/login-de-cuenta/login-de-cuenta.component';
import { FormularioRegistroComponent } from './componentes/formulario-registro/formulario-registro.component';
import { LoginDeCuentaComponent } from './componentes/login-de-cuenta/login-de-cuenta.component';
import { PaginaPrincipalComponent } from './paginas/pagina-principal/pagina-principal.component';
import { VistadePerfilComponent } from './paginas/vista-de-perfil/vista-de-perfil.component';
import { EdicionDePerfilComponent } from './paginas/edicion-de-perfil/edicion-de-perfil.component';
import { AnadirPublicacionComponent } from './paginas/anadir-publicacion/anadir-publicacion.component';

export const routes: Routes = [
  { path: 'registro', component: FormularioRegistroComponent },
  { path: 'login', component: LoginDeCuentaComponent },
  { path: 'inicio', component: PaginaPrincipalComponent },
  { path: 'perfil', component: VistadePerfilComponent },
  { path: 'editar-perfil', component: EdicionDePerfilComponent },
  { path: 'anadir-publicacion', component: AnadirPublicacionComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];
