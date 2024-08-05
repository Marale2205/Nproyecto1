import { Injectable } from '@angular/core';
//servicios en la nube de autentificacion de firebase 
import { AngularFireAuth } from '@angular/fire/compat/auth';
//accedemos directamente alservicio firestore 
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class AutService {
  //REFERENCIAL AUTH DE FIREBASE EN EL SERVICIO
  constructor(
     private auth: AngularFireAuth,
    private  servicioFirestore: AngularFirestore) { }

  //FUNCION PARA REGISTRO
  registrar(email: string, password: string) {
    //referenciar auth de firebase en el servicio
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  //FUNCION PARA INICIO SECCION 
  iniciarSesion(email: string, password: string) {
    //validar la informacion del usuario-> saber si exite en la coleccion 
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //FUNCION PARA SERRAR SECICON 
  cerrarSesion() {
    //devuelveuna promesa vacia-> quita token
    return this.auth.signOut();
  }

  //FUNCION PARA TOMAR EL UID
  async obtenerUid(){
    //esto nos va a generar una promesa y la constante la va a capturar
    const user =await this.auth.currentUser;
    /*
    si el usuarionno respeta la estructura de lainterfaz/
    si tuvo problemas para el registro -> ej: mal internet
      */
    if(user == null){
      return null;
    }else{
      return user.uid;
    }
  }
  obtenerUsuarios(email:string){
    /**
     * retornamos del servicio firestore la coleccion de 'usuarios' buscamos una referencia en los emails
     *  registrados y los comparamos con lo que ingresamos al inicar session, y lo cobtinede con el punto get 
     * lo vuelve una proesa => da un resultado o rechazado
     */
    return this.servicioFirestore.collection('usuarios', ref =>ref.where ('email', '==',email)).get().toPromise();

  }
}
