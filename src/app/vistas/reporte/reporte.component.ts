import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { InformeInterface } from '../../models/informe.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  btnPrinBool = true;
  reporteBool = false;
  buscarBool = false;
  buscarBtn = true;

  hospitalizacion:string;


  constructor() {}

  formInforme = new FormGroup<any>({
    nombre: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    lugarNacimiento: new FormControl('', Validators.required),
    lugarProcedencia: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    historiaClinica: new FormControl('', Validators.required),
    fechaIngreso: new FormControl('', Validators.required),
    fechaInforme: new FormControl('', Validators.required),
    tiempoEnfermedad: new FormControl('', Validators.required),
    inicioEnfermedad: new FormControl('', Validators.required),
    cursoEnfermedad: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.required),
    hospAnteriores: new FormControl('', Validators.required),
    transSangre: new FormControl('', Validators.required),
    quirurgico: new FormControl('', Validators.required),
    tabaquismo: new FormControl('', Validators.required),
    alcoholismo: new FormControl('', Validators.required),
    biomasa: new FormControl('', Validators.required),
    examenFisico: new FormControl('', Validators.required),
    evolucion: new FormControl('', Validators.required),
  });
  ngOnInit(): void {

  }

  nuevoInfBtn() {
    this.reporteBool = true;
    this.btnPrinBool = false;
  }
  buscarInfBtn() {
    this.buscarBool = true;
    this.buscarBtn = false;
  }

  GuardarInforme(form: InformeInterface) {
    console.log(form);
  }

  camvbiarBool(){
    
  }

}
