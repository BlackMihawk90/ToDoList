import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import swal from 'sweetalert2';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public Usuario = {
    email: '',
    password: ''
  }



    constructor(public service:AppService, private router: Router) {

    }

    login(){
      return this.service.login(this.Usuario).subscribe(
        data =>  {
          console.log(data)
          this.router.navigate(["/listado", {idusuario:data.status} ])
          this.service.set_session(data)
        },

        error =>

        swal.fire({
          title: 'Contraseña no coindcide con la base de datos',
          text: "ERROR",
          icon: 'error'
        })

      )
    }


  }
