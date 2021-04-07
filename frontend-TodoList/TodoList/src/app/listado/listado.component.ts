import { Component, OnInit, ViewChild} from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css',
   './font-awesome.css']
})
export class ListadoComponent implements OnInit {
  public listado_tareas : any [];
  @ViewChild("closebutton") closebutton: any;
  @ViewChild("closebuttonUpdate") closebuttonUpdate: any;

  public idusuario2: string;
  public iddTarea = {
    idta:""
  }
  public Tareas ={
    tituloDeLaTarea: "",
    description: "",
    estado: "",
    userName: ""
  }
  public TareaActualizar={
    _id: "",
    tituloDeLaTarea: "",
    description: "",
    estado: false,
    userName : ""
  }

  public v={
    _id: "",
    tituloDeLaTarea: "",
    description: "",
    estado: false,
    userName : ""
  }

  constructor(public service:AppService, private activatedRoutee: ActivatedRoute) {

    this.listado_tareas = [];
    this.idusuario2= "";
    this.iddTarea;
   }



  ngOnInit() {
    let idusuario1 = this.activatedRoutee.snapshot.params.idusuario;
    console.log(idusuario1);
    this.idusuario2 = idusuario1;
    this.get_tareas();
  }


  completeItem(){

  }


  get_idusuario(){
      let idusuario1 = this.activatedRoutee.snapshot.params.idusuario;
    console.log(idusuario1);
    this.idusuario2 = idusuario1;
  }





   get_tareas(){
     var response: any[];
     let idusario: string;
     idusario = this.idusuario2;
     this.Tareas.userName =idusario;
    this.service.get_tareas(this.Tareas.userName).subscribe(
        data => response = data,
        err => {
            console.log("Error al llamar el servicio");
        },
        ()=>{
            this.listado_tareas = response;
            console.log(response);
        }
    );

}



   insert_tareas(){
    var response;
    this.Tareas.userName = this.idusuario2;
    if (this.Tareas.estado == "") {
      this.Tareas.estado = "false"
    }
    this.service.insert_tareas(this.Tareas).subscribe(
        data => response = data,
        err => {
            console.log("Error")
        },
        ()=>{
            this.Tareas = {
                tituloDeLaTarea: "",
                description:"",
                estado:"",
                userName:""
            }


          swal.fire({
            title: 'Tarea Agregado Satisfactoriamnete',
            icon: 'success'
          })

            this.get_tareas();
            this.closebutton.nativeElement.click();




        }
    )
}

delete_tareas(id1: any){
  var response;
  var load={
    id : id1
  }
  this.service.delete_tareas(load).subscribe(
      data => response = data,
      err => {
          console.log("Error")
      },
      ()=>{
          this.get_tareas();

      }
  )
}

pasarTareas(tarea: { tituloDeLaTarea: any; description: any; estado:any, _id:any}){

  this.TareaActualizar={
      _id:tarea._id,
      tituloDeLaTarea:tarea.tituloDeLaTarea,
      description:tarea.description,
      estado:tarea.estado,
      userName: this.idusuario2
  }
}


pasarTareas1(v: { tituloDeLaTarea: any; description: any; estado:any, _id:any}){
  if (v.estado == "") {
    v.estado = "false"
  }
  this.v={
      _id:v._id,
      tituloDeLaTarea:v.tituloDeLaTarea,
      description:v.description,
      estado:v.estado,
      userName: this.idusuario2
  }
}

update_tareas(){
  var response;
  this.service.update_tareas(this.TareaActualizar).subscribe(
      data => response = data,
      err => {
          console.log("Ocurrio un error al llamar el servicio");
      },
      ()=>{

        swal.fire({
          title: 'Tarea Actualizada Satisfactoriamnete',
          icon: 'success'
        })

             this.get_tareas();
             this.closebuttonUpdate.nativeElement.click();
      }
  )

}

update_tareas_checkbox(v: { tituloDeLaTarea: any; description: any; estado:any, _id:any}){
  var response;
  if (v.estado == true) {
    v.estado=false
  }else if (v.estado == false) {
    v.estado=true
  }
  this.v={
    _id:v._id,
    tituloDeLaTarea:v.tituloDeLaTarea,
    description:v.description,
    estado:v.estado,
    userName: this.idusuario2
}
console.log("turu " + this.v.estado)
  this.service.update_tareas(this.v).subscribe(
      data => response = data,
      err => {
          console.log("Ocurrio un error al llamar el servicio");
      },
      ()=>{

        swal.fire({
          title: 'Se actualizo la tarea',
          icon: 'success'
        })
             console.log()
             this.get_tareas();
      }
  )
}


}
