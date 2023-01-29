import { Injectable } from '@angular/core';
import { LoginInterface } from '../../models/login.interface';
import { ResponseInterface } from '../../models/response.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaPacientesInterface } from '../../models/listapacientes.interface';
import { PacienteInterface } from '../../models/paciente.interface';
import { UsuarioInterface } from '../../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  
  //url:string = "/APIS/apirestPHP/api/auth";
  url:string = "https://localhost:44398/api/";



  constructor(private http:HttpClient) { }


  loginByEmail(form:LoginInterface): Observable<ResponseInterface>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseInterface>(direccion, form);
  }

  registrarse(usuario:string, password:string){
    return this.http.post(usuario, password);
  }


  getAllPacients():Observable<ListaPacientesInterface[]>{
    let direccion = this.url + "Paciente";
    return this.http.get<ListaPacientesInterface[]>(direccion);
  }


  getSinglePacient(id:any):Observable<PacienteInterface>{
    let direccion =  this.url + "Paciente/" + id;
    return this.http.get<PacienteInterface>(direccion);
  }

  putPacient(form:PacienteInterface):Observable<ResponseInterface>{

    let direccion = this.url + "Paciente/"+form.pacienteId;
    return this.http.put<ResponseInterface>(direccion, form);
  }

  deletePacient(form:PacienteInterface):Observable<ResponseInterface>{
    let direccion = this.url + "Paciente/"+form.pacienteId;

    let options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:form
    }

    return this.http.delete<ResponseInterface>(direccion, options);
  }

  postPacient(form:PacienteInterface):Observable<ResponseInterface>{
    let direccion = this.url + "Paciente";
    return this.http.post<ResponseInterface>(direccion, form);
  }



  //FUNCIONES PARA EL USUARIO
  registrarUsuario(form:UsuarioInterface):Observable<ResponseInterface>{
    let direccion = this.url + "Usuario";
    return this.http.post<ResponseInterface>(direccion, form);
  }
}
