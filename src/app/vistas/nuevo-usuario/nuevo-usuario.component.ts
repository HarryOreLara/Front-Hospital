import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginInterface } from '../../models/login.interface';
import { Router } from '@angular/router';
import { ResponseInterface } from 'src/app/models/response.interface';
import { Serializer } from '@angular/compiler';
import { UsuarioInterface } from '../../models/usuario.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  usuario: string;
  password: string;
  passwordTwo:string;
  estado:string;

  erroStatus: boolean = false;
  erroMsg: any = '';

  datosUsuario:UsuarioInterface;

  registroForm = new FormGroup<any>({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordTwo: new FormControl('', Validators.required),
    estado:new FormControl('', Validators.required)
  });

  constructor(private api: ApiService, private router: Router, private alertas:AlertasService) {}

  ngOnInit(): void {
    let estado = "Activo";
    this.registroForm.patchValue({
      'estado':estado
    });
  }


  registrar(form:UsuarioInterface){

    if (form.password != form.passwordTwo) {

      this.alertas.showError('Contraseñas Incorrectas, Intente de nuevo', 'Error!!')
      return this.limpiarContenido();
    }


    this.api.registrarUsuario(form).subscribe(data=>{
      let respuesta:ResponseInterface = data;
      if (respuesta.status == "ok") {
        this.alertas.showSuccess('Usuario Agregado', 'Exito');
        this.limpiarContenido();
      } else {
        this.alertas.showError('Error al Registrar', 'Error!')
      }
    });
  }

  limpiarContenido(){
    this.registroForm.reset();
  }
}
