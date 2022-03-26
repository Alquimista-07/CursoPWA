import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Importamos mi AppRoutinModule
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule // Importamos mi modulo de rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
