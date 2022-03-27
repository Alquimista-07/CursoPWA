import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importamos mi AppRoutinModule
import { AppRoutingModule } from './app-routing.module';

// Para usar el llamado a la API que vamos a hacer importamos el modulo HttpClientModule que nos permite hacer peticiones http
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PaisComponent } from './pages/pais/pais.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importamos mi modulo de rutas
    HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}) // Importamos el modulo HttpClientModule para permitirnos las peiticiones http
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
