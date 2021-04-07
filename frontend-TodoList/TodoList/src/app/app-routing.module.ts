import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent}from './login/login.component';
import {RegistroComponent} from './registro/registro.component';
import {RecuClaveComponent} from './recu-clave/recu-clave.component';
import {ListadoComponent} from './listado/listado.component';
import {AgregarTareaComponent} from './agregar-tarea/agregar-tarea.component';
import {NewpasswordComponent} from './newpassword/newpassword.component';
import {TokenformComponent} from './tokenform/tokenform.component'
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component:  RegistroComponent},
  {path: 'recu-clave', component: RecuClaveComponent},
  {path: 'listado', component: ListadoComponent},
  {path: 'agregar-tarea', component: AgregarTareaComponent},
  {path: 'newpassword', component: NewpasswordComponent},
  {path: 'tokenform', component: TokenformComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
