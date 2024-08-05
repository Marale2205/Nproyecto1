export interface Usuario {
    uid:string | any;//recibe valores del tipo "any" reciben vacios o idefinidos
    nombre:string;
    apellido:string;
    email:string;
    rol:string;
    password:string;
}
