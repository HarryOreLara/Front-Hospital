import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginInterface } from '../../models/login.interface';
import { Router } from '@angular/router';
import { ResponseInterface } from 'src/app/models/response.interface';
import { Serializer } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string;
  password:string;
  passwordTwo:string;
  erroStatus:boolean = false;
  erroMsg:any = "";



  loginForm = new FormGroup({
    usuario:new FormControl('',Validators.required),
    password:new FormControl('', Validators.required)
  })


  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    //this.checkLocalStorage();
  }


  checkLocalStorage(){
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }




  onLogin(form:any){
    //console.log(form);
    this.api.loginByEmail(form).subscribe(data=>{

      //##############SE TIENE QUE VALIDAR EL INICIO DE SESION

      let dataResponse:ResponseInterface =  data;
      if (dataResponse.status == "ok") {
        localStorage.setItem("token", dataResponse.result.error_msg);
        this.router.navigate(['dashboard']);
      }else{
        this.erroStatus = true;
        this.erroMsg = dataResponse.result.error_msg;
      }
    })
  }

  encontrarPalabra(frase:string, palabra:string){
    let palabras =  frase.split(' ');
    return palabras.indexOf(palabra) != -1;
  }

  guardar(){
    this.api.registrarse(this.usuario,this.password);
  }


  nuevoUsuario(){
    this.router.navigate(['nuevoUsuario']);
  }

}
