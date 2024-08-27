import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/components/inicio/inicio.component';

const routes: Routes = [
  //ruta por defecto en la inicializacion 
  {
    path: "", component: InicioComponent
  },
  //ruta que nos vincula al modulo de inicio y todo su contenido y una carga peresosa 
  //son las rutas las cuales nos  llevaran alas rutas hijas 
  //loadChildren:indica que habra una ruta hija 
  //.then.funcon asincronica tipo PROMESA
  {
    path: "", loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: "", loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: "", loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
  {
    path: "", loadChildren:()=> import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
