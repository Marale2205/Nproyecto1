import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './pages/producto/producto.component';
import { AbonoComponent } from './pages/abono/abono.component';
import { FertilizantesComponent } from './pages/fertilizantes/fertilizantes.component';
import { MacetasComponent } from './pages/macetas/macetas.component';

//vinculamos toas las vitas que estan dentro del modul
const routes: Routes = [
  {
    path:"producto",component:ProductoComponent
  },
  {
    path:"abono",component:AbonoComponent
  },
  {
    path:"fertilizantes",component:FertilizantesComponent
  },
  {
    path:"macetas",component:MacetasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
