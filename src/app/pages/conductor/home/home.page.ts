import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Viaje } from 'src/app/interfaces/viaje';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  viajes: Viaje[] = [];

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;

  constructor(private router: Router,
              private menuController: MenuController,
              private viajesService: ViajesService

  ) { }

  ngOnInit() {
    this.config()
    this.menuController.enable(true);
    const usuarioLogin = localStorage.getItem('usuarioLogin');

    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellUsuario = user.apellido;
    }
  }

  config(){
    this.viajes = this.viajesService.getViajes();
  }

  goHome() {

  }

  goHistorial() {

  }

  goPerfil() {

  }

}
