import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-cond-actividad',
  templateUrl: './cond-actividad.page.html',
  styleUrls: ['./cond-actividad.page.scss'],
})
export class CondActividadPage implements OnInit {

  viajes: Viaje[] = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
    this.config()
  }

  config(){
    this.viajes = this.viajesService.getViajes();
  }

}
