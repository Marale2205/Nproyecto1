import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
//inicio -paguina
import { InicioComponent } from './components/inicio/inicio.component';
//componentes locales 
import { CardComponent } from './components/card/card.component';
//componentes de material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    InicioComponent,
    CardComponent
  ],
  imports: [
    //importamos desde la web y traemos al modulo
    CommonModule,
    InicioRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[
    //exportamos al resto de la paguina 
    MatButtonModule,
    MatCardModule
  ]
})
export class InicioModule { }
