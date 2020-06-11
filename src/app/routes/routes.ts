

import { Routes, RouterModule} from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';
import { AuthguardGuard } from '../guards/authguard.guard';
import { AuthGuardRole } from '../guards/rol.guard';
import { HomeComponent } from '../pages/home.component';
import { AdministracionComponent } from '../pages/administracion/administracion.component';
import { DetalleComponent } from '../pages/detalle.component';





export const routes: Routes = [

  { path: 'home' , component: HomeComponent, canActivate: [ AuthguardGuard ] },
  { path: 'administracion' , component: AdministracionComponent, canActivate: [ AuthGuardRole ]},
  { path: 'detalle/:tokenid' , component: DetalleComponent, canActivate: [ AuthguardGuard ] },
//   { path: 'listapersonas' , component: ListaPersonasComponent, canActivate: [ AuthGuardRole ] },
//   { path: 'listapersonasmail' , component: ListaPersonasMailComponent, canActivate: [ AuthGuardRole ] },
//   { path: 'detallepersonasmail/:id_persona' , component: DetallePersonaMailAdminComponent, canActivate: [ AuthGuardRole ] },
//   { path: 'detallepersonas/:id_persona' , component: DetallePersonaAdminComponent, canActivate: [ AuthGuardRole ] },
//   { path: 'reporteglobal' , component: ReporteglobalComponent, canActivate: [ AuthGuardRole ]},
//   { path: 'incidenciasapp' , component: IncidenciasappComponent, canActivate: [ AuthGuardRole ]},
//   { path: 'perfil/:id' , component: PerfilComponent, canActivate: [ AuthguardGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', redirectTo: '/login' }
];


