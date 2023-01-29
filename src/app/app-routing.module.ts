import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { NuevoUsuarioComponent } from './vistas/nuevo-usuario/nuevo-usuario.component';
import { NoEncontradoComponent } from './plantillas/no-encontrado/no-encontrado.component';
import { ReporteComponent } from './vistas/reporte/reporte.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'nuevo', component: NuevoComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'nuevoUsuario', component: NuevoUsuarioComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: '**', component: NoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  DashboardComponent,
  NuevoComponent,
  EditarComponent,
  NuevoUsuarioComponent,
  ReporteComponent,
  NoEncontradoComponent,
];
