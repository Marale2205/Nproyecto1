import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { transition } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //definimos coleccion para los pridcutos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');

  }

  //CREAR PRODUCTOS
  crearProducto(producto: Producto) {
    return new Promise(async (resolve, reject) => {
      try {
        //creamos numeros identificativo para el producto en la base de datos
        const idProducto = this.database.createId();
        //asignamos ID creado al atributo  idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }

    }
    )
  }
  //OBTENER PRODCUTOS 
  /*
  snapshotChanges=> toma una captura del estado de los datos 
  pipe=> tuberias que retornan un nuevo arreglo 
  map=> "mapa" o rrecorre esa nueva informacion
  a => reguarda la nueva informacion  y la envia 
  */
  obtenerProducto() {
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }
  //EDITAR PRODUCTOS
  modificarProducto(idProducto: string, nuevaData: Producto) {
    /*
    accedemos a la colleccion "productos" de la base de datos, buscamos el ID del producto seleecionado 
    y lo actualizamos con el metodo "update", enviando la nueva informacion*/
    return this.database.collection('productos').doc(idProducto).update(nuevaData);

  }
  //ELIMINAR PRODUCTOS
  eliminarProdcuto(idProducto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productosCollection.doc(idProducto).delete();
        resolve(respuesta);
      }
      catch (error) {
        reject(error);
      }
    })
  }


}


