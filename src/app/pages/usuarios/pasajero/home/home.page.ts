import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ViajesService } from 'src/app/services/viajes.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public idUsuario?: number;

  map: any;

  constructor(private router: Router,
              private menuController: MenuController,
              private viajesService: ViajesService) { }

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-33.598449986499055, -70.57880611157175], 17); 
  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    noWrap: true,
  }).addTo(this.map);
  this.map.zoomControl.setPosition('bottomright');
  }
             
  ngOnInit() {
    this.menuController.enable(true);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellUsuario = user.apellido;
      this.idUsuario = user.id;
    }
  }
}

