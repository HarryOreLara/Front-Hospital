import { Component, OnInit } from '@angular/core';
import { ListaPacientesInterface } from '../../models/listapacientes.interface';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  pacientes:ListaPacientesInterface[];

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllPacients().subscribe(data=>{
      this.pacientes = data;
    });
  }

  editarPaciente(id:number){
    this.router.navigate(['editar',id]);
    //console.log(id);
  }



  nuevoPaciente(){
    this.router.navigate(['nuevo']);
  }

}
