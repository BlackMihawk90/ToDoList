import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tokenform',
  templateUrl: './tokenform.component.html',
  styleUrls: ['./tokenform.component.css']
})
export class TokenformComponent {

  constructor(public service: AppService, private router: Router) { }

  public Token = {
    token: ''
  };


  //todo; redirigirlo a la pagina de reseteo de password
  verificaElToken(){

    return this.service.verificaElToken(this.Token).subscribe(
      data =>{


        console.log(data);
        this.router.navigate(['/newpassword',{id:data.status}])
      },
      error => console.log(error)
    )
  }


}
