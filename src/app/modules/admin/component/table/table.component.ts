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
  producto = new FormGroup({
    nombre: new FormControl,
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })
  constructor(public servicioCrud: CrudService) { }
  ngOnInit(): void { }

  async agregarProducto() {
    if (this.producto.valid) {
      let nuevoProducto: Producto = {
        idProducto: '',
        nombre: this.producto.value.nombre!,
        precio: this.producto.value.precio!,
        descrpcion: this.producto.value.descripcion!,
        categoria: this.producto.value.categoria!,
        imagen: this.producto.value.imagen!,
        alt: this.producto.value.alt!
      }
      //llama al nuevo producto q esta definido let nuevoProducto
      await this.servicioCrud.crearProducto(nuevoProducto)
        .then(producto => {
          alert("ha agregado un nuevo producto con éxito.");
        })
        .catch(error => {
          alert("ha ocurrido un error al cargar un producto")
        })
    }

  }
}


