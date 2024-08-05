import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
//IMPORTACMOS SERVICIO DE AUTENTIFICACION
import { AutService } from '../../services/aut.service';
//IMPORTAMOS COMPONENTE DE RUTAS DE ANGULAR
import { Router } from '@angular/router';
//IMPORTAMOS SERVICIO DE FIRESTORE
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
//importamos paquetería crypto-js 
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  //input  de la contraseña  para ver los cracteres o no
  hide = true;
  //######################################## importaciones de interfaz 'usuarios'
  //Importar la interfazde usuario-> Inicializar
  usuarios: Usuario = {
    uid: '',// ->inicializamos con comillas simples porque es String
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }
  //creamos coleccion de ususarios, tipo 'usuario' para arrays
  colecccionUsuarios: Usuario[] = [];
  //###################################### fin de crear
  constructor(
    public servicioAuth: AutService,
    public servicioRutas: Router,
    public servicioFirestore: FirestoreService
  ) { }




  //funcion para el registro de nuevos ususarios
  async registrar() {
    //constatante  credenciales va a reguardar la informacion queingrese el usuario
    /* esyo era el registro local 
     const credenciales={
      uid: this.usuarios.uid,
      nombre:this.usuarios.nombre,
      apellido:this.usuarios.apellido,
      email:this.usuarios.email,
      rol:this.usuarios.rol,
      password:this.usuarios.password
    }*/

    //REGISTRO CON SERVICIO
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password

    }

    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
      //el metodo then es una promesa que vuelve el mismoo valor si todo sale bien
      .then(res => {
        alert("¡Se pudo registrar con exito! :)");

        //el metodo navigate nos redirecionaa otra vista 
        this.servicioRutas.navigate(['/inicio']);
      })
      //el metodo .catch captura una falla y la vuleve un error cuando la promesa 
      .catch(error => {
        alert("Hubo un error al registrarun nuevo usuario :( \n" + error);
      })
    //enviamos la nueva informacion como un nuevo objecto ala coleccion usuarios
    // this.colecccionUsuarios.push(credenciales);

    //mostramos credenciales por consola 
    console.log(credenciales);

    //constante UID captura el identificado de la BD 
    const uid = await this.servicioAuth.obtenerUid();

    //se le asigna al atributo  de la interfaz es constante 
    this.usuarios.uid = uid;
    /**
     * sha256:es un algoritmo de has seguro que toma una entrada (en este caso la contraseña )
     * y produce una cadena de caracteres hexadecimal que va a representar a su hash 
     * tostirng: convierte el resultado en la cadena de caracteres legible  
     */
    this.usuarios.password=CryptoJS.SHA256(this.usuarios.password).toString();

    //llamammos ala funcion guardarusuario()

    this.guardarUsuario();

    //llamamos la funcion limpiarInputs() para ejecutar 
    this.limpiarInputs();
    //notificacion el exito al registro para el usuario
    //alert("¡Te registraste con éxito! :)")

    //Mostramos credenciales por consola 
    //console.log(credenciales);
    //console.log(this.colecccionUsuarios);
  }
  //Funcion que acede a servicio Firestore y envia la informacionagregada al uid 
  async guardarUsuario() {
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
      .then(res => {
        console.log(this.usuarios);
      })
      .catch(err => {
        console.log('Error =>', err);
      })
  }


  //Funcion para vaciar los "inputs" del formularios
  limpiarInputs() {
    //En constante "inputs" llamamos alos atributos y los inicalizamos como vacios (string =', number=0)
    const credenciales = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}
