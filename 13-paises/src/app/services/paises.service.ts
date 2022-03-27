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

  // Cremos un meotodo para obtener los paises
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

  // Creamos un metodo para obtener paises por id
  getPaisPorId( id: string ){

    // Verifico si ya hay paises cargados
    if( this.paises.length > 0 ){
      // Hay paises en el arreglo, por consecuencia puedo obtener paises por id
      const pais = this.paises.find( p => p.cca3 === id );
      console.log("Pais: ", pais?.name.common);
      return Promise.resolve( pais );
    }

      // Carga los paises y regresa una promesa
      return this.getPaises().then( paises => {

        const pais = this.paises.find( p => p.cca3 === id );
        return Promise.resolve( pais );

      });

  }

}
