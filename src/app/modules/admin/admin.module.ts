import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//archivo de rutas del modulo 
import { AdminRoutingModule } from './admin-routing.module';
//vista 
import { AdminComponent } from './pages/admin/admin.component';
//componente
import { TableComponent } from './component/table/table.component';
//paqueteriaa para formularios y formularios reactivos 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
 //angularMaterial componentes
 import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AdminComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports:[
    AdminComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AdminModule { }
