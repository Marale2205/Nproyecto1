import { Component } from '@angular/core';
import { AutService } from 'src/app/modules/autentificacion/services/aut.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logueado=true;//booleano para manejo y el inicio de sesion
  deslogeado=false;//booleano para manejar de cierre sesion

  constructor(
    public servicioAuth: AutService,
    public servicioRutas: Router
  ){}

  //Funcion Ingresar para a invertir los valores
  ingresar(){
    this.logueado=false;
    this.deslogeado=true;
  }

  //Funcion CerarSesion  devuelve los valores originales
  cerrarSesion(){
    this.deslogeado=false;
    this.logueado=true;
    
    //llamamos al metodo de cerrar sesion para limpiar el token
    this.servicioAuth.cerrarSesion();

    //redirigimos ala raiz del sitio web
    this.servicioRutas.navigate(['/']);
  }
}
