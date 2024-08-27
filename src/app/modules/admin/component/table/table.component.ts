import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  //creamos coleccion local de productos --> la definimos como array
  coleccionProductos: Producto[] = [];
  productoSeleccionado!: Producto; // ! <-toma vlaores vacios 
  modalVisibleProdcuto: boolean = false;

  //definimos formularios para los productos 
  /**
   * atributos alfanumnericos (string)  se incicializa con comillas simples
   * Atrinutos numericos (number) se inicializa con cero ('0')
   */
  producto = new FormGroup({
    nombre: new FormControl,
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })
  constructor(public servicioCrud: CrudService) { }
  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
    })
  }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descripcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      }
      //llama al nuevo producto q esta definido let nuevoProducto
      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          alert("ha agregado un nuevo producto con éxito.");
          //resetea el formulario y las casillas quedan vacias 
          this.producto.reset();
        })
        .catch(error => {
          alert("ha ocurrido un error al cargar un producto")
          this.producto.reset();
        })
    }

  }
  //Funcion vinculada al modal y el boton de la tabla 
  mostrarBorrar(productoSeleccionado: Producto) {
    this.modalVisibleProdcuto = true;

    this.productoSeleccionado = productoSeleccionado;
  }

  borrarProductos() {
    this.servicioCrud.eliminarProdcuto(this.productoSeleccionado.idProducto)
      .then(respuesta => {
        alert("se ha podido eliminar con exito");
      })
      .catch(error => {
        alert("ha ocurrido un error al eliminar un producto:\n" + error)
      })
  }

  //editar productos 
  // se envia y llama al momento que tocmaos botn editar de la tabla 
  /**
   * 
   * toma los valores del productos seleccionados y los va a 
   * autocompletar en el formulario del modal(menos el ID)
   */
  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado=this.productoSeleccionado;
    
    this.producto.setValue({
      nombre: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      descripcion: productoSeleccionado.descripcion,
      categoria: productoSeleccionado.categoria,
      imagen: productoSeleccionado.imagen,
      alt: productoSeleccionado.alt
    })

  }

  editarProductos() {
    let datos: Producto = {
      //solo idproducto no se modifca por el usuario 
      idProducto: this.productoSeleccionado.idProducto,
      /**
       * los demas  atributos reciben  nueva informacion desde el formualrio 
       */
      nombre: this.producto.value.nombre!,
      precio: this.producto.value.precio!,
      descripcion: this.producto.value.descripcion!,
      categoria: this.producto.value.categoria!,
      imagen: this.producto.value.imagen!,
      alt: this.producto.value.alt!
    }
    //Enviamos al metodo de id del producto seleccionado y los datos actualizados
    this.servicioCrud.modificarProducto(this.productoSeleccionado.idProducto, datos)
      .then(producto => {
        alert("El producto se ha modifcado con exito");
        this.producto.reset();
      })
      .catch(error => {
        alert("Hubo un problema al modificar el producto:\n" + error);
        this.producto.reset();
      })
  }
}


