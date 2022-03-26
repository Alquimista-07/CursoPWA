import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importamos mi AppRoutinModule
import { AppRoutingModule } from './app-routing.module';

// Para usar el llamado a la API que vamos a hacer importamos el modulo HttpClientModule que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PaisComponent } from './pages/pais/pais.component';
import { PaisesComponent } from './pages/paises/paises.component';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importamos mi modulo de rutas
    HttpClientModule // Importamos el modulo HttpClientModule para permitirnos las peiticiones http
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
