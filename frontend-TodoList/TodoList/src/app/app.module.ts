import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuClaveComponent } from './recu-clave/recu-clave.component';
import { ListadoComponent } from './listado/listado.component';
import { AgregarTareaComponent } from './agregar-tarea/agregar-tarea.component';
import {AppService} from '././app.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TokenformComponent } from './tokenform/tokenform.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminGuard } from './admin.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuClaveComponent,
    ListadoComponent,
    AgregarTareaComponent,
    TokenformComponent,
    NewpasswordComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AppService,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
