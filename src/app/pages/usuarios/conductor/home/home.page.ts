import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: any = [];
  viajeEnCurso: Viaje | null = null; // Para almacenar el viaje en curso

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;

  private viajeEnCursoSubscription: Subscription | undefined;


  constructor(
    private router: Router,
    private menuController: MenuController,
    private viajesService: ViajesService,
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit() {
    this.config();
    this.menuController.enable(true);
    this.checklogin();
  }

  async checklogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (user) {
        // Logeado
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.tipoUsuario = usuarioData.tipo;
          this.emailUsuario = usuarioData.email;
          this.nombreUsuario = usuarioData.nombre;
          this.apellUsuario = usuarioData.apellido;

          // Obtener el viaje en curso
          this.viajeEnCursoSubscription = this.viajesService.getViajeEnCurso(user.uid).subscribe(viajes => {
            this.viajeEnCurso = viajes.length > 0 ? viajes[0] : null; // Si hay un viaje en curso, guardarlo
          });
        }
      }
    });
  }

  config() {
    this.fireStore.collection('viajes').valueChanges().subscribe(aux => {
      this.viajes = aux;
    });
  }

}
