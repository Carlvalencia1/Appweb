import { Component } from '@angular/core';
import { SeccionComponent } from '../seccion/seccion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../servicios/paciente.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [SeccionComponent, CommonModule, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  pacientes: { nombreCompleto: string }[] = [];
  pacienteSeleccionado: { nombreCompleto: string } | null = null;
  fechaConsulta: string = '';
  profesionalSeleccionado: string = '';
  profesionales: string[] = ['ANEOL PARIOLA, HIPOSFITO', 'Otro Profesional'];
  tabActivo = 'Anamnesis';
  anamneseTexto: string = '';
  exploracionTexto: string = '';
  diagnosticoTexto: string = '';
  tratamientoTexto: string = '';
  observacionesTexto: string = '';

  historicoConsultas: { fecha: string, anamnesis: string, exploracion: string, diagnostico: string, tratamiento: string, observaciones: string, profesional: string }[] = [];
  consultaSeleccionada: any = null;

  constructor(private pacienteService: PacienteService) {
    this.cargarPacientes();
  }

  cargarPacientes() {
    this.pacientes = this.pacienteService.obtenerPacientes();
    if (this.pacientes.length > 0) {
      this.pacienteSeleccionado = this.pacientes[0];
    }
    console.log('Pacientes cargados:', this.pacientes);
  }

  actualizarNombreCompleto() {
  
  }

  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }

  guardarConsulta() {
    if (this.fechaConsulta && this.anamneseTexto) {
      this.historicoConsultas.push({
        fecha: this.fechaConsulta,
        anamnesis: this.anamneseTexto,
        exploracion: this.exploracionTexto,
        diagnostico: this.diagnosticoTexto,
        tratamiento: this.tratamientoTexto,
        observaciones: this.observacionesTexto,
        profesional: this.profesionalSeleccionado
      });
      this.resetForm();
    }
  }

  verMas(consulta: any) {
    this.consultaSeleccionada = consulta;
  }

  cerrarDetalles() {
    this.consultaSeleccionada = null;
  }

  resetForm() {
    this.fechaConsulta = '';
    this.anamneseTexto = '';
    this.exploracionTexto = '';
    this.diagnosticoTexto = '';
    this.tratamientoTexto = '';
    this.observacionesTexto = '';
  }


  generarPDF(consulta: any) {
    const doc = new jsPDF();
    
   
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("Detalles de la Consulta", 10, 10);

   
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(10, 15, 200, 15); 

  
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

   
    const detalles = [
      `Fecha: ${consulta.fecha}`,
      `Profesional: ${consulta.profesional}`,
      `Anamnesis: ${consulta.anamnesis}`,
      `Exploración: ${consulta.exploracion}`,
      `Diagnóstico: ${consulta.diagnostico}`,
      `Tratamiento: ${consulta.tratamiento}`,
      `Observaciones: ${consulta.observaciones}`
    ];

    let y = 20; 
    detalles.forEach((detalle, index) => {
      doc.text(detalle, 10, y);
      y += 10; 
    });

    
    const startX = 5;
    const startY = 5;
    const width = 200;
    const height = y + 5; 

    doc.rect(startX, startY, width, height); 

  
    doc.save(`consulta_${consulta.fecha}.pdf`);
  }
}
