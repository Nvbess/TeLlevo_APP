import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from './interfaces/page';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;

  constructor(private router: Router) {}

  ngOnInit() {
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellUsuario = user.apellido;
      this.configSideMenu();
    } else {
    }
  }

  configSideMenu() {
    if (this.tipoUsuario === 'admin') {
      this.appPages = [
        { title: 'Home', url: '/admin-home', icon: 'home' },
        { title: 'Administrar Pasajeros', url: '/lista-pas', icon: 'people' },
        { title: 'Administrar Conductores', url: '/lista-cond', icon: 'people' },
        { title: 'Administrar Viajes', url: '/adm-viajes', icon: 'car' },
        { title: 'Perfil', url: '/perfil-admin', icon: 'construct' },
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    } else if (this.tipoUsuario === 'pasajero') {
      this.appPages = [
        { title: 'Home', url: '/pasajero-home', icon: 'home' },
        {title: 'Actividad', url: '/viajes-pas', icon: 'receipt'},
        {title: 'Perfil', url: '/pj-profile', icon: 'person'},
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    } else {
      this.appPages = [
        { title: 'Home', url: '/conductor-home', icon: 'home' },
        {title: 'Actividad', url: '/cond-actividad', icon: 'receipt'},
        {title: 'Perfil', url: '/cond-profile', icon: 'person'},
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    }
  }

  logout() {
    localStorage.removeItem('usuarioLogin');
    this.router.navigate(['inicio']);
  }
}
