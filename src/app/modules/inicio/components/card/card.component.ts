import { Component } from '@angular/core';
//importamos interfaz 
import { Flores } from 'src/app/models/flores';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    //propiedad publica (typo array)
    public info:Flores[];
    
    //inicializar la propiedad info
      constructor(){
        //objectos
        this.info =[
          {
            id:"",
            nombre:"Tulipanes",
            color:"Rosados",
            imagen:"https://i.pinimg.com/736x/d5/fc/fc/d5fcfc4e9f6924a2555396218c299a0d.jpg",
            cantidad: 5
          },
          {
            id:"",
            nombre:"Rosas",
            color:"Blancas",
            imagen:"https://florerialatoscana.com.ar/wp-content/uploads/2022/08/rosas-28.jpg",
            cantidad: 2
          },
          {
            id:"",
            nombre:"Lotus",
            color:"Blanco mas rosado",
            imagen:"https://blog.giulianaflores.com.br/wp-content/uploads/2014/04/flor-de-lotus.jpg",
            cantidad: 3
          }
        ]
      }

}
