import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteInterface } from '../../models/paciente.interface';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { LoginInterface } from '../../models/login.interface';
import { ResponseInterface } from '../../models/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';


import * as moment from 'moment';

//PRUEBA DE TOASTR
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers:[DatePipe]
})
export class EditarComponent implements OnInit {



  constructor(private router:Router, 
              private activateRouter:ActivatedRoute,
              private api:ApiService,
              private alertas:AlertasService,
              private toastri:ToastrService,
              private miDatePipe: DatePipe) 
  { }



  datosPaciente: PacienteInterface;
  
  //editarForms= new FormGroup<any>({});

  editarForm = new FormGroup<any>({
    nombre: new FormControl(''),
    correo:new FormControl(''),
    dni:new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    token: new FormControl(''),
    imagen: new FormControl(''),
    pacienteId: new FormControl(''),
  });

  ngOnInit(): void {
    let pacienteid = this.activateRouter.snapshot.paramMap.get('id');    //aca se obtiene el id que se manda desde el dashboard
    let token = this.getToken();
    this.api.getSinglePacient(pacienteid).subscribe(data=>{
      let pacienteArray = Object.values(data);

      this.datosPaciente = pacienteArray[0];

      const myFormat = 'YYYY-MM-DD';
      const myDate = moment(this.datosPaciente.fechaNacimiento, 'YYYYMMDDHHmmss').format(myFormat);

      this.editarForm.setValue({
        'nombre': this.datosPaciente.nombre,
        'correo': this.datosPaciente.correo,
        'dni': this.datosPaciente.dni,
        'direccion': this.datosPaciente.direccion,
        'codigoPostal': this.datosPaciente.codigoPostal,
        'genero': this.datosPaciente.genero,
        'telefono': this.datosPaciente.telefono,
        'fechaNacimiento': myDate,
        'token': token,
        'imagen': this.datosPaciente.imagen,
        'pacienteId': pacienteid
      });
    });
    //console.log(pacienteid);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  postForm(form:PacienteInterface){//UPDATE
    this.api.putPacient(form).subscribe(data=>{
      let respuesta:ResponseInterface = data;
      if (respuesta.status == "ok") {
        this.alertas.showSuccess('Datos Modificados', 'Hecho');
      }else{
        this.alertas.showError("respuesta.result.error_msg", 'Error');
      }
    });
    //console.log(form);
  }

  eliminar(){
    let datos:PacienteInterface = this.editarForm.value;
    this.api.deletePacient(datos).subscribe(data=>{
      let respuesta:ResponseInterface = data;
      if(respuesta.status == "ok"){
        this.alertas.showSuccess('Paciente Eliminados', 'Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alertas.showError("respuesta.result.error_msg", 'Error');
      }
    });
  }


  salir(){
    this.router.navigate(['dashboard']);
  }
}
