import {Injectable} from '@angular/core';
import { from, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppService{
  reser_sesssion() {
    throw new Error('Method not implemented.');
  }

  private endpoint: string;
  private endpoint1: string;
  constructor(private httpClient: HttpClient) {

     //ruta crear tareas
     this.endpoint1 = 'http://' +window.location.hostname + ':3000/Lista'

    //ruta crear usuario
    this.endpoint = 'http://' + window.location.hostname + ':3000/todolist';
   }
   //registro ususario
   crearUsuario( load: any ): Observable<any>{
     return this.httpClient.post(this.endpoint + '/crearUsuario', load,  {responseType: 'json'});
   }

   //login
   login(load:any): Observable<any>{
     return this.httpClient.post(this.endpoint + '/iniciarSession', load, {responseType: 'json'});
   }

   //envia el correo para resetear la contraseña
   olvidoSuPassword( email: any ): Observable<any>{
     return this.httpClient.post(this.endpoint + '/enviodelcorreo', email,  {responseType: 'json'});
   }

   // verifica el token que le callo al correo al usuario
   verificaElToken(token: any): Observable<any>{
     return this.httpClient.post(this.endpoint + '/password/:token', token, {responseType: 'json'});
   }

   // formulario de newpassword y envia el id del usuario
   newPassword(id: any, newPassword: any): Observable<any>{
    console.log(id)
    console.log(newPassword)
     return this.httpClient.post(this.endpoint + '/changepassword?_id='+id, newPassword , {responseType: 'json'});
   }

   // verifica el token
   loggedIn(){
     return localStorage.getItem('status.token');
   }

   set_session(token: any){
    localStorage.setItem("listado", JSON.stringify(token));
  }

  get_session(){
    if(localStorage.getItem("listado") ){
        return true;
    }else{
      return false;
    }
  }



   //get listado de tareas
   get_tareas(userName: any): Observable<any>{
    return this.httpClient.get(this.endpoint1 + '/get_tarea?userName='+ userName,  { responseType: 'json'});
  }

  insert_tareas(load: any): Observable<any>{
    return this.httpClient.post(this.endpoint1 + '/insert_tarea', load ,  { responseType: 'json'})
  }

  delete_tareas(load: any):Observable<any>{
    return this.httpClient.delete(this.endpoint1 + '/delete_tarea', {params: load, responseType: 'json'})
  }

  update_tareas(load: any): Observable<any>{
    return this.httpClient.put(this.endpoint1 + '/update_tarea', load, {responseType: 'json'})
  }

  get_idusuario(): Observable<any>{
    return this.httpClient.get(this.endpoint + '/get_idusuario', {responseType: 'json'});
  }
}


