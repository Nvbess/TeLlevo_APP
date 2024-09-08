import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/viajes.service';


@Component({
  selector: 'app-pj-actividad',
  templateUrl: './pj-actividad.page.html',
  styleUrls: ['./pj-actividad.page.scss'],
})
export class PjActividadPage implements OnInit {

  viajes: Viaje[] = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
    this.config()
  }

  config(){
    this.viajes = this.viajesService.getViajes();
  }

}