import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutService } from '../../services/aut.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  hide = true;
  //############################# LOCAL
  // DEFINIMOS COLECCION LOCAL DEL USUARIO
  /**
   * 
   * 
  constructor(){
  
  public coleccionUsuariosLocales:Usuario[];
  
    this.coleccionUsuariosLocales=[
     {
      uid:'',
      nombre:'Santiago',
      apellido:'Nuñes',
      email:'santinuñes@gmail.com',
      rol:'adimn',
      password:'123456'
     },
     {
      uid:'',
      nombre:'juan',
      apellido:'Perez',
      email:'juanperez@gmail.com',
      rol:'vis',
      password:'abcdef'
     },
      {
        uid: '',
        nombre: 'Thalia',
        apellido: 'Rosales',
        email: 'thaliarosales@gmail.com',
        rol: 'vis',
        password: 'abcdef'
      }
    ]
  }
   */

  //######################### FIN LOCAL
  constructor(
    public servicioAuth: AutService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  //######################## INGRESADO
  //DEFINIMOS LA INTERFAZ DEL USUARIO
  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }
  //Funcion para inicializar secion 
  async iniciarSeccion() {
    /*
        //Recibe la informacion ingresada desde el navegador
    
        const credeciales = {
          uid: this.usuarios.uid,
          nombre: this.usuarios.nombre,
          apellido: this.usuarios.apellido,
          email: this.usuarios.email,
          rol: this.usuarios.rol,
          password: this.usuarios.password
        }
    
        //Repetiva para recorrer la collecion de usar locales
        for (let i = 0; i < this.coleccionUsuariosLocales.length; i++) {
          //usuariolocal coresponde a esa posiscion en especifico 
          const usuariolocal = this.coleccionUsuariosLocales[i];
        }
        // Condicional para verificar la existencia del usuario ingresado
        if (usuarioLocal.nombre === credenciales.nombre &&
          usuarioLocal.apellido === credenciales.apellido &&
          usuarioLocal.email === credenciales.email &&
          usuarioLocal.rol === credenciales.rol &&
          usuarioLocal.password === credenciales.password) {
          // Notificamos al usuario que pudo ingresar
          alert("¡Ingresaste con éxito! :)");
          // Paramos a la función
          break;
        } else {
          alert("Ocurrió un problema al iniciar sesión :(");
          break;
        }
          */
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try {
      // obtenemos usuario de la Base de Datos
      const usuarioBD = await this.servicioAuth.obtenerUsuarios(credenciales.email);

      // // Condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra colección
      if (!usuarioBD || usuarioBD.empty) {
        // alert("Correo electronico no registrado");
        //  this.limpiarinputs();
        // return;
        Swal.fire({
          title: "¡Oh no!",
          text: "Correo electrónico no registrado",
          icon: "error"
        });
        this.limpiarInputs();
        return;
      }
      //vincula al primer documento de la coleccion "usuarios" que se obtenia desde la bd
      const usuarioDOC = usuarioBD.docs[0];
      //estraes los datos del documento en forma de "objeto" y se especifica que va a ser del 
      //  tipo "Usuario" (se refiere a la interfaz Usuario de nuestros modelos)
      const usuarioDatas = usuarioDOC.data() as Usuario;

      //// Encripta la contraseña que el usuario envía mediante "Iniciar Sesión"
      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();
      /*
       Condicional que compara la contraseña que acabamos de encriptar y que el usurio 
       envío con la que recibimos del "usuarioData"
     */
      if (hashedPassword !== usuarioDatas.password) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Contraseña incorrecta",
          icon: "error"
        });

        this.usuarios.password = '';
        return;
      }
      const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
        .then(res => {
          Swal.fire({
            title: "¡Buen trabajo!",
            text: "¡Se pudo ingresar con éxito :)!",
            icon: "success"
          });

          this.servicioRutas.navigate(['/inicio']);
        })
        .catch(err => {
          Swal.fire({
            title: "¡Oh no!",
            text: "Hubo un problema al iniciar sesión :( " + err,
            icon: "error"
          });

          this.limpiarInputs();
        })
    } catch (error) {
      this.limpiarInputs();
    }
  }

  limpiarInputs() {
    const inputs = {
      email: this.usuarios.email = '',
      password: this.usuarios.password = ''
    }
  }
}
