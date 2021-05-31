import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  
  URL = 'http://localhost/api/'

  constructor( private http: HttpClient ) { }

  // crear paciente
  altaPaciente(pacientes){    
    return this.http.post(`${this.URL}AltaPaciente.php`, JSON.stringify(pacientes));
   }

  // obtener paciente 
  getPaciente(){
      return this.http.get(`${this.URL}ObtenerPacientes.php`);
  }

   //Selecionar paciente del boton editar 
   seleccionarPaciente( idpaciente: number ){
     return this.http.get(`${this.URL}SeleccionarPaciente.php?idpaciente=${idpaciente}`);
   }

   // editar pacientes 
   editarPaciente( pacientes ){
    return this.http.post(`${this.URL}EditarPaciente.php`, JSON.stringify(pacientes));
   }

   //eliminar paciente 
   eliminarPaciente(idpaciente){
    return this.http.get(`${this.URL}EliminarPaciente.php?idpaciente=${idpaciente}`);
   }

   // nuevo hitorial
   altaHistorial(newhistorial){    
    return this.http.post(`${this.URL}NuevoHistorial.php`, JSON.stringify(newhistorial));
   }

   // obtenerHistoriales
   getHistorial(){
      return this.http.get(`${this.URL}ObtenerHistoriales.php`);
   }

   // Obtener Expedientes
   getExpedientes(idpaciente){
     return this.http.get(`${this.URL}ObtenerExpedientes.php?idpaciente=${idpaciente}`);
   }

  // Seleccionar Expediente
   seleccionarExpediente( idhistorial: number ){
     return this.http.get(`${this.URL}SeleccionarExpediente.php?idhistorial=${idhistorial}`);      
   }

  // Editar Expediente
  editarExpediente(expediente){
      return this.http.post(`${this.URL}EditarExpediente.php`, JSON.stringify(expediente))
  }
   
   
  // imprimr Receta 
  seleccionarRecetaPDF( idhistorial: number ){
       window.open(`${this.URL}extensiones/tcpdf/pdf/rec.php?idhistorial=${idhistorial}`,'_blank');
  }

  
  

}
