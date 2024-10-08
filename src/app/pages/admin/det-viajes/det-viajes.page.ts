import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/firebase/viajes.service';

@Component({
  selector: 'app-det-viajes',
  templateUrl: './det-viajes.page.html',
  styleUrls: ['./det-viajes.page.scss'],
})
export class DetViajesPage implements OnInit {
  viajeID?: number;
  viaje?: Viaje;
  nombreConductor?: string | null;
  apellidoConductor?: string | null;
  idConductor?: string | null;
  nombrePasajero?: string | null;
  apellidoPasajero?: string | null;
  idPasajero?: string | null;
  origenViaje?: string | null;
  destinoViaje?: string | null;
  fechaViaje?: string | null;
  horaViaje?: string | null;
  costoViaje?: number | null;
  capacidadViaje?: number | null;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private viajesService: ViajesService
  ) {}

  ngOnInit() {}
  /*ngOnInit() {
    const id_viaje = this.activatedRoute.snapshot.paramMap.get('id');
    if (id_viaje) {
      this.viajeID = Number(id_viaje);
    }
    if (this.viajeID) {
      this.viaje = this.viajesService.getViaje(this.viajeID);
      if (this.viaje) {
        this.nombreConductor = this.viaje.conductor.nombre;
        this.apellidoConductor = this.viaje.conductor.apellido;
        this.nombrePasajero = this.viaje.pasajeros.map(pasajero => pasajero.nombre).join(', ');
        this.apellidoPasajero = this.viaje.pasajeros.map(pasajero => pasajero.apellido).join(', ');
        this.idConductor = this.viaje.conductor.uid;
        this.idPasajero = this.viaje.conductor.uid;
        this.origenViaje = this.viaje.origen;
        this.destinoViaje = this.viaje.destino;
        this.fechaViaje = this.viaje.fecha;
        this.horaViaje = this.viaje.hora;
        this.costoViaje = this.viaje.costo;
        this.capacidadViaje = this.viaje.capacidad;
      }
    }
  }*/
}
