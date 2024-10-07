import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacientesKey = 'pacientes';
  private citasKey = 'citas';

  constructor() {
    this.cargarDatosDesdeLocalStorage();
  }


  agregarPaciente(paciente: any): void {
    const pacientes = this.obtenerPacientes();
    pacientes.push(paciente);
    this.guardarPacientesEnLocalStorage(pacientes);
  }


  obtenerPacientes(): any[] {
    return JSON.parse(localStorage.getItem(this.pacientesKey) || '[]');
  }


  private guardarPacientesEnLocalStorage(pacientes: any[]): void {
    localStorage.setItem(this.pacientesKey, JSON.stringify(pacientes));
  }

  obtenerCitas(): any[] {
    return JSON.parse(localStorage.getItem(this.citasKey) || '[]');
  }

  agregarCita(cita: any): void {
    const citas = this.obtenerCitas();
    citas.push(cita);
    localStorage.setItem(this.citasKey, JSON.stringify(citas));
  }

  guardarCitasEnLocalStorage(citas: any[]): void {
    localStorage.setItem(this.citasKey, JSON.stringify(citas));
  }

  
  private cargarDatosDesdeLocalStorage(): void {
    if (!localStorage.getItem(this.citasKey)) {
      this.guardarCitasEnLocalStorage([
        {
          nombre: 'ALFREDO AL',
          sala: 'Sala 2',
          profesional: 'Clesigpira',
          hora: '10:15 a.m.',
          dia: 'Feb 8',
          duracion: '25 min',
          color: '#d1f7c4',
        },
        {
          nombre: 'FERNANDEZ DE FLORES DIONIO',
          sala: 'Sala 3',
          profesional: 'Recordatorio Vacun',
          hora: '10:45 a.m.',
          dia: 'Feb 9',
          duracion: '30 min',
          color: '#c2e9fb',
        },
      ]);
    }

    if (!localStorage.getItem(this.pacientesKey)) {
      this.guardarPacientesEnLocalStorage([
        { nombre: 'ALFREDO ',
           edad: 45, 
           historiaClinica: '12345' 
          },
        { 
          nombre: 'Juan',
           edad: 50, 
           historiaClinica: '67890' 
          },
      ]);
    }
  }
}
