import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisInterface } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  // Creamos una propiedad
  private paises: PaisInterface[] = []; // Especificamos el tipo de información que contiene

  constructor( private http: HttpClient ) { }

  // Cremos un meotod para obtener los paises
  getPaises(): Promise<PaisInterface[]> {

    if( this.paises.length > 0 ){
      return Promise.resolve( this.paises );
    }

    return new Promise( resolve => {

      this.http.get('https://restcountries.com/v3.1/lang/spa')
        .subscribe( paises => {

          console.log(paises);
          this.paises = <PaisInterface[]>paises;
          resolve( <PaisInterface[]>paises);

        });

    });

  }

}
