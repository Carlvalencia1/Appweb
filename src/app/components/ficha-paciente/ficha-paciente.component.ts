import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeccionComponent } from '../seccion/seccion.component';
import { ListadoComponent } from '../listado/listado.component';
import { FormsModule } from '@angular/forms'; 
import { PacienteService } from '../../servicios/paciente.service';

@Component({
  selector: 'app-ficha-paciente',
  standalone: true,
  imports: [CommonModule, RouterLink, SeccionComponent, FormsModule, ListadoComponent],
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css']
})
export class FichaPacienteComponent {
  tabActivo = 'Foto';
  

  nombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  estadoCivil: string = '';
  fechaNacimiento: string = '';
  edad: number | null = null;
  grupoSanguineo: string = '';
  dni: string = '';
  numHistoriaClinica: string = '';
  movil: string = '';
  email: string = '';
  aseguradora: string = '';
  numTarjeta: string = '';
  direccion: string = '';
  localidad: string = '';
  provincia: string = '';
  codigoPostal: string = '';
  genero: string = '';
  estado: string = '';
  
  
  foto: string | null = ''; 
  
  constructor(private pacienteService: PacienteService) {}

  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }

  borrarFoto() {
    this.foto = null;
  }

  guardarPaciente() {
    const nuevoPaciente = {
      nombreCompleto: `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`, 
      estado: this.estado,
      genero: this.genero,
      fechaNacimiento: this.fechaNacimiento,
      edad: this.edad,
      grupoSanguineo: this.grupoSanguineo,
      dni: this.dni,
      numHistoriaClinica: this.numHistoriaClinica,
      movil: this.movil,
      email: this.email,
      aseguradora: this.aseguradora,
      numTarjeta: this.numTarjeta,
      direccion: this.direccion,
      localidad: this.localidad,
      provincia: this.provincia,
      codigoPostal: this.codigoPostal,
      foto: this.foto 
    };

    
    this.pacienteService.agregarPaciente(nuevoPaciente);
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.nombre = '';
    this.primerApellido = '';
    this.segundoApellido = '';
    this.estadoCivil = '';
    this.fechaNacimiento = '';
    this.edad = null;
    this.grupoSanguineo = '';
    this.dni = '';
    this.numHistoriaClinica = '';
    this.movil = '';
    this.email = '';
    this.aseguradora = '';
    this.numTarjeta = '';
    this.direccion = '';
    this.localidad = '';
    this.provincia = '';
    this.codigoPostal = '';
    this.genero = '';
    this.estado = '';
    this.foto = null; 
  }
}
