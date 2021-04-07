import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  public idusuario: string;

  public User ={
    _id: ''
  }

  public Passwords ={
    password: ''
  };


  //TODO: como enviar un parametro en angular por url
  constructor(public service: AppService, private router: Router, private activeRoute: ActivatedRoute  ) {
    this.idusuario= '';
  }

  ngOnInit(): void{
    let _id = this.activeRoute.snapshot.params.id
    console.log(_id);
    this.idusuario = _id
  }


  enviarPassword() {
      let respuesta;
      let idusario: string;
      idusario = this.idusuario;
      this.User._id = idusario;

      this.service.newPassword(this.User._id,this.Passwords).subscribe(
        data => respuesta = data,
        error => {
          console.log('Error', error)
        },
        () =>{
          this.router.navigate(["/login"])
        }

    )
  }
}
