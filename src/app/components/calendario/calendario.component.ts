import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PacienteService } from '../../servicios/paciente.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {

  


  citas: any[] = [];
  pacientes: any[] = [];
  semanaActual: number = 5; // Semana actual
  diasSemana: string[] = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  fechaHoy: Date = new Date();

  // Variables para el formulario de edición de citas
  citaSeleccionada: any = null;
  pacienteSeleccionado: string = '';
  medicoSeleccionado: string = '';
  salaSeleccionada: string = '';

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.cargarCitas();
    this.pacientes = this.pacienteService.obtenerPacientes(); // Carga los pacientes
    this.actualizarFechaHoy();
  }

  // Método para cargar las citas
  cargarCitas(): void {
    this.citas = this.pacienteService.obtenerCitas();
  }

  // Cambia la semana actual
  cambiarSemana(valor: number): void {
    this.semanaActual += valor;
    this.actualizarFechaHoy();
  }

  // Actualiza la fecha a partir de la semana actual
  actualizarFechaHoy(): void {
    let inicioSemana = new Date();
    inicioSemana.setDate(this.fechaHoy.getDate() - this.fechaHoy.getDay() + (this.semanaActual - 5) * 7);
    this.diasSemana = this.diasSemana.map((dia, i) => {
      let fecha = new Date(inicioSemana);
      fecha.setDate(fecha.getDate() + i);
      return `${dia} ${fecha.getDate()}`;
    });
  }

  // Abre el formulario de edición para la cita seleccionada
  editarCita(cita: any): void {
    this.citaSeleccionada = { ...cita }; // Carga los datos de la cita seleccionada
    this.pacienteSeleccionado = cita.nombre; // Carga el nombre del paciente
    this.salaSeleccionada = cita.sala; // Carga la sala de la cita
  }

  // Guarda los cambios de la cita
  guardarCambios(): void {
    if (this.citaSeleccionada) {
      this.citaSeleccionada.nombre = this.pacienteSeleccionado;
      this.citaSeleccionada.sala = this.salaSeleccionada;
      this.citaSeleccionada.profesional = this.medicoSeleccionado;

      // Actualiza las citas y guarda en el servicio
      const index = this.citas.findIndex(c => c === this.citaSeleccionada);
      this.citas[index] = this.citaSeleccionada;
      this.pacienteService.guardarCitasEnLocalStorage(this.citas);
      
      // Limpia la selección de cita
      this.citaSeleccionada = null;
    }
  }

  // Método para ver la información de una cita
  verInformacionCita(cita: any): void {
    console.log('Información de la cita:', cita);
  }
}