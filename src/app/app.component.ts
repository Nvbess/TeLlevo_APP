import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from './interfaces/page';
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
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Administrar Usuarios', url: '/adm-usuarios', icon: 'people' },
        { title: 'Administrar Viajes', url: '/adm-viajes', icon: 'car' },
        { title: 'Configuración', url: '/config', icon: 'construct' },
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    } else if (this.tipoUsuario === 'pasajero') {
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        {title: '', url: '', icon: ''},
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    } else {
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        {title: '', url: '', icon: ''},
        { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    }
  }

  logout() {
    localStorage.removeItem('usuarioLogin');
    this.router.navigate(['inicio']);
  }
}
