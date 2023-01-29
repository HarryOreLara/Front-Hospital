import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { PacienteInterface } from '../../models/paciente.interface';
import { ApiService } from '../../servicios/api/api.service';
import { ResponseInterface } from '../../models/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent implements OnInit {
  nuevoForm = new FormGroup<any>({
    nombre: new FormControl(''),
    correo: new FormControl(''),
    dni: new FormControl(''),
    direccion: new FormControl(''),
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    telefono: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    token: new FormControl(''),
    imagen: new FormControl(''),
    pacienteId: new FormControl(''),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertasService
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token':token
    });
  }

  postForm(form: PacienteInterface) {
    this.api.postPacient(form).subscribe(data=>{
      console.log(data);
      let respuesta:ResponseInterface = data;
      if (respuesta.status == "ok") {
        this.alert.showSuccess('Paciente Agregado', 'Hecho');
        this.limpiarForm();
      }else{
        this.alert.showError(respuesta.result.error_msg, 'Error');
      }
    });
  }

  salir() {
    this.router.navigate(['dashboard']);
  }

  limpiarForm(){
    this.nuevoForm.reset();
  }
}
