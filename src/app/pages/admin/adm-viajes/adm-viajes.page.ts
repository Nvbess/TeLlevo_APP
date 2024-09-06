import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-adm-viajes',
  templateUrl: './adm-viajes.page.html',
  styleUrls: ['./adm-viajes.page.scss'],
})
export class AdmViajesPage implements OnInit {

  viajes: Viaje[] = [];

  constructor(private viajesService: ViajesService) { }

  ngOnInit() {
    this.config()
  }

  config(){
    this.viajes = this.viajesService.getViajes();
  }

}
