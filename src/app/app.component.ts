import { Component } from '@angular/core';
import { Page } from './interfaces/page';
import { Router } from '@angular/router';
import { InicioPage } from './pages/inicios/inicio/inicio.page';

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

  private ADMIN_PAGES: Page[] = [
    { title: 'Home', url: '/admin-home', icon: 'home' },
    { title: 'Administrar Pasajeros', url: '/lista-pas', icon: 'people' },
    { title: 'Administrar Conductores', url: '/lista-cond', icon: 'people' },
    { title: 'Administrar Viajes', url: '/det-viajes', icon: 'car' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
  ];

  private PASAJERO_PAGES: Page[] = [
    { title: 'Home', url: '/pasajero-home', icon: 'home' },
    { title: 'Actividad', url: '/pj-actividad', icon: 'receipt' },
    { title: 'Perfil', url: '/pj-profile', icon: 'person' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
  ];

  private CONDUCTOR_PAGES: Page[] = [
    { title: 'Home', url: '/conductor-home', icon: 'home' },
    { title: 'Actividad', url: '/cond-actividad', icon: 'receipt' },
    { title: 'Perfil', url: '/cond-profile', icon: 'person' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out', action: this.logout.bind(this) },
  ];

  public labels = ['Family', 'Friends', 'Notes',];

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  private cargarDatosUsuario() {
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellUsuario = user.apellido;

      this.configSideMenu();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  private configSideMenu() {
    switch (this.tipoUsuario) {
      case 'admin':
        this.appPages = [...this.ADMIN_PAGES];
        break;
      case 'pasajero':
        this.appPages = [...this.PASAJERO_PAGES];
        break;
      case 'conductor':
        this.appPages = [...this.CONDUCTOR_PAGES];
        break;
      default:
        this.appPages = [];
    }
  }

  logout(){
    localStorage.clear();
    localStorage.removeItem('usuarioLogin');
    this.router.navigate(['/inicio']);
  }
}

