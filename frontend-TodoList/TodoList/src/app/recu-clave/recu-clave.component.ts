import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-recu-clave',
  templateUrl: './recu-clave.component.html',
  styleUrls: ['./recu-clave.component.css']
})
export class RecuClaveComponent {

  public Email = {
      email: ''
  }


  constructor(public service: AppService) { }

  olvidoSuPassword(): void{
    let respuesta;
    this.service.olvidoSuPassword(this.Email).subscribe(
      data => respuesta = data,
      error =>{
        console.log('Error', error);
      },
      ()=>{

        swal.fire({
          title: 'Token enviado al correo',
          text: "Revisa!",
          icon: 'success'
        })
          this.Email= {
            email: ''
          }
      }
    );
  }



}

