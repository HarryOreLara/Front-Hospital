export interface InformeInterface{
    nombre:string;
    dni:number;
    edad:number;
    fechaNacimiento:Date;
    genero:string;
    lugarNacimiento:string;
    lugarProcedencia:string;
    direccion:string;
    historiaClinica:number;
    fechaIngreso:Date;
    fechaInforme:Date;
    tiempoEnfermedad:string;
    inicioEnfermedad:string;
    cursoEnfermedad:string;
    comentarios:string;
    hospAnteriores:string | boolean;
    examenFisico:string;
    evolucion:string;
}