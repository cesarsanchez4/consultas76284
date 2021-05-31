import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/interfaces/pacientes.interface';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {

  // Obtener la lista de pacientes 
  // pacientes: any = {}; 
  pacientes: Pacientes[]; 
  
  paciente: any = {};

  p: number = 1;

  filtrarNombre: any = '';

  constructor( public pacientesService: PacientesService ) { }

  ngOnInit(): void {
      this.obtenerPacientes();
  }

  obtenerPacientes(){
      this.pacientesService.getPaciente().subscribe( (resp: Pacientes[]) => {
            this.pacientes = resp;
            console.log(this.pacientes);
            
      });
  }

  seleccionarPaciente(idpaciente){
        this.pacientesService.seleccionarPaciente(idpaciente)
              .subscribe( resp =>  {
                   this.paciente = resp[0];
                   console.log(this.paciente);                   
              });
  }

  editarPaciente(){
     this.pacientesService.editarPaciente(this.paciente).subscribe( resp => {
                   if( resp['resultado'] =='OK' ){
                    Swal.fire({                      
                      icon: 'success',
                      title: 'Paciente editado correctamente',
                      showConfirmButton: false,
                      timer: 2000
                    })
                       this.obtenerPacientes();
                   }
                });
  }


  eliminarPaciente(idpaciente) {
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar el paciente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.pacientesService.eliminarPaciente(idpaciente).subscribe( resp => {        
            if( resp['resultado'] == 'OK'){
      swalWithBootstrapButtons.fire(
        'Eliminado',
        'HAga click para continuar',
        'success'
      )
      this.obtenerPacientes();
                  
                      }  });
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Ups!',
          'error'
        )
      }
    })

    
  }





}
