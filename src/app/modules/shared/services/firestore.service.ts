import { Injectable } from '@angular/core';
//cloud Firestore -> accedemos alas colecciones 
import{AngularFirestore,AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/models/usuario';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  //DEFINIMOS DE FORMA PRIVADA LA COLECCION DE USUARIO PARA QUENO SEA ACCESIBLE
  // EN TODA LA APALICACION ,LO DEFINIMOS COMO UNA COLECCION DE FIRESTORE  QUE RESPETE
  //LA ESTRUCTURA DE NUESTRA INTERFAZ DE 'USUARIOS' 
  private usuariosCollection:AngularFirestoreCollection<Usuario>
  constructor(private database:AngularFirestore) {
    /*
    Usuarioscollection va a definir la nueva colecccion 'usuarios' que estara en nuestra base de datos
     */
    this.usuariosCollection= this.database.collection<Usuario>('usuarios');
   }

   agregarUsuario(usuario:Usuario, id:string){
    /*
    creamos una nueva  promesa junto a los metodos;
    RESOLVE: promesa  resuelta-> funciona correctamente 
    REJECT:promesa rechazada-> ocurrio una falta 
     */

    return new Promise(async(resolve,reject) =>{
      //encapsula lo que esta dentro de la promesa Bloqueo try encapsula la logica resuelta
      try{
        usuario.uid=id;
        /**
         * const resultado= coleccion de usuarios, envia como numero de documento uid
         * y setea la informacion que ingresamos en el formulario de registro 
         */

        const resultado= await this.usuariosCollection.doc(id).set(usuario);

        resolve (resultado);
        //Bloqueo Catch encapsula la logica rechazada 
      }catch(error){
        //captura una falla y la nueva vuelve 'error'
        reject(error);
      }
    })
   }
}
