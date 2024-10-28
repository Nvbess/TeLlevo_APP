import { Component } from '@angular/core';
import { Page } from './interfaces/page';
import { Router } from '@angular/router';
import { InicioPage } from './pages/inicios/inicio/inicio.page';
import { AuthService } from './services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from './interfaces/usuario';

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
    { title: 'Administrar Usuarios', url: '/usuarios', icon: 'people' },
    { title: 'Administrar Pasajeros', url: '/lista-pas', icon: 'people' },
    { title: 'Administrar Conductores', url: '/lista-cond', icon: 'people' },
    { title: 'Administrar Viajes', url: '/viajes', icon: 'car' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out'}
  ];

  private PASAJERO_PAGES: Page[] = [
    { title: 'Home', url: '/pasajero-home', icon: 'home' },
    { title: 'Actividad', url: '/viajes-pas', icon: 'receipt' },
    { title: 'Perfil', url: '/pj-profile', icon: 'person' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out'},
  ];

  private CONDUCTOR_PAGES: Page[] = [
    { title: 'Home', url: '/conductor-home', icon: 'home' },
    { title: 'Actividad', url: '/cond-actividad', icon: 'receipt' },
    { title: 'Perfil', url: '/cond-profile', icon: 'person' },
    { title: 'Cerrar Sesión', url: '', icon: 'log-out'},
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
      this.authService.isLogged().subscribe(async (user)=> {
        if(user) {
          // Logeado
          const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
          const usuarioData = usuarioLogeado?.data() as Usuario;
  
          if (usuarioData) {
            this.tipoUsuario = usuarioData.tipo;
            this.emailUsuario = usuarioData.email;
            this.nombreUsuario = usuarioData.nombre;
            this.apellUsuario = usuarioData.apellido;
            this.configSideMenu();
          }
        }
      })
    }

  configSideMenu() {
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

  logout() {
      this.authService.logout();
  }
}

