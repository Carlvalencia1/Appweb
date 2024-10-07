import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionComponent } from '../seccion/seccion.component';
import { PacienteService } from '../../servicios/paciente.service';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, SeccionComponent],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  @Input() pacientes: any[] = [];  
  pacienteSeleccionado: any = null;  

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    if (this.pacientes.length === 0) {
      this.pacientes = this.pacienteService.obtenerPacientes(); 
    }
  }

  verMas(paciente: any) {
    this.pacienteSeleccionado = paciente;  // Almacena el paciente seleccionado
  }

  cerrar() {
    this.pacienteSeleccionado = null;  
  }
}
