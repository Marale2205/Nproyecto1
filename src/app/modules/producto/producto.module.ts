import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { AbonoComponent } from './pages/abono/abono.component';
import { FertilizantesComponent } from './pages/fertilizantes/fertilizantes.component';
import { MacetasComponent } from './pages/macetas/macetas.component';


@NgModule({
  declarations: [
    ProductoComponent,
    AbonoComponent,
    FertilizantesComponent,
    MacetasComponent

  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ],
  exports:[
    ProductoComponent,
    AbonoComponent,
    FertilizantesComponent,
    MacetasComponent
  ]
})
export class ProductoModule { }
