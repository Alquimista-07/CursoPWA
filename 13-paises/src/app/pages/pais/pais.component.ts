import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisesService } from '../../services/paises.service';
import { PaisInterface } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  // Creamos una propiedad que me permita mostrar la información del pais
  pais: any;

  constructor(
    // Necesito el servicio para poder obtener cual es el pais que estoy seleccionando
    // por el id
    public paisesService: PaisesService,
    // Necesito poder leer el url
    private activatedRoute: ActivatedRoute,
    // Validamos el id, si el id no regresa ningún pais entonces tenemos que sacar al usuario de la pantalla pais
    private router: Router
  ) { }

  ngOnInit(): void {

    // Obtenemos el id que estoy recibiendo por el url
    const id = this.activatedRoute.snapshot.params['idPais'];
    console.log(id);

    this.paisesService.getPaisPorId( id ).then( pais => {

      if( !pais ){
        // Si no existe el pais sacamos al usuario de la pantalla porque no es correcto
        this.router.navigateByUrl('/');
      }

      this.pais = pais;
      console.log(pais);

    });


  }

}
