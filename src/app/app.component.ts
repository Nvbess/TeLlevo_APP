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
      this.configSideMenu();
    } else {
    }
  }

  configSideMenu() {
    if (this.tipoUsuario === 'admin') {
      this.appPages = [
        { title: 'Dashboard', url: '/home', icon: 'home' },
        { title: 'Usuarios', url: '/home', icon: 'mail' },
        { title: 'Log out', url: '', icon: 'log-out', action: this.logout.bind(this) },
      ]
    } else if (this.tipoUsuario === 'pasajero') {
      this.appPages = [
        {title: '', url: '', icon: ''},
        {title: '', url: '', icon: ''},
        {title: '', url: '', icon: ''},
      ]
    } else {
      this.appPages = [
        {title: '', url: '', icon: ''},
        {title: '', url: '', icon: ''},
        {title: '', url: '', icon: ''},
      ]
    }
  }

  logout() {
    localStorage.removeItem('usuarioLogin');
    this.router.navigate(['login']);
  }
}
