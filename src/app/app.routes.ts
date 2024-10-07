import { Routes } from '@angular/router';
import { FichaPacienteComponent } from './components/ficha-paciente/ficha-paciente.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { ListadoComponent } from './components/listado/listado.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
    {path: 'ficha-paciente', component: FichaPacienteComponent},
    {path: 'consulta', component: ConsultasComponent},
    {path: 'listado', component: ListadoComponent},
    {path: 'calendario', component: CalendarioComponent},
    { path: '', redirectTo: '/ficha-paciente', pathMatch: 'full' },


];
