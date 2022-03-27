import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisesComponent } from './pages/paises/paises.component';
import { PaisComponent } from './pages/pais/pais.component';

// Configuramos la rutas
const routes: Routes = [
  {
    path: '',
    component: PaisesComponent
  },
  {
    path: 'pais/:idPais',
    component: PaisComponent
  },
  {
    path: '**',
    component: PaisesComponent
  }
];

@NgModule({
  // Importamos los modulos a las rutas principales de mi aplicación
  imports: [ RouterModule.forRoot( routes ) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
