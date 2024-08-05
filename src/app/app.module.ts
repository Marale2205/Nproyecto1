import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//ruta padre-> modulo raiz
import { AppRoutingModule } from './app-routing.module';

//archivo component general 
import { AppComponent } from './app.component';

//solo importamos compononetes globales 
import { SharedModule } from './modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FIREBASE -> importamos herramientas de la base de datos
import { enviroment } from 'src/environments/environments';//VINCULA  ALA BD CON LA APP
import { AngularFireModule } from '@angular/fire/compat';//TRABAJA CON LA COLECCIONES DE INFORMACION
import { AngularFireAuthModule } from '@angular/fire/compat/auth';//TRABAJA CON LA AUTENTIFICACION 
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; //TRABAJA CON IMAGENES Y ARCHIVOS
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig),//inicializar firebase  dentro del proyecto
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
