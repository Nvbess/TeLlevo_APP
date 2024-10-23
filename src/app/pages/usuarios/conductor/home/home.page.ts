import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  viajeEnCurso: Viaje | null = null;

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;
  public conductorUid?: string;

  private viajeEnCursoSubscription: Subscription | undefined;


  constructor(
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
        const usuarioLogeado = await this.fireStore.collection('usuarios').doc(user.uid).get().toPromise();
        const usuarioData = usuarioLogeado?.data() as Usuario;

        if (usuarioData) {
          this.tipoUsuario = usuarioData.tipo;
          this.emailUsuario = usuarioData.email;
          this.nombreUsuario = usuarioData.nombre;
          this.apellUsuario = usuarioData.apellido;
          this.conductorUid = usuarioData.uid;
          this.config();

          this.viajeEnCursoSubscription = this.viajesService.getViajeEnEspera(user.uid).subscribe(viajes => {
            this.viajeEnCurso = viajes.length > 0 ? viajes[0] : null;
          });
        }
      }
    });
  }

  config() {
    if (this.conductorUid) {
      this.fireStore.collection('viajes', ref => 
        ref.where('conductorUid', '==', this.conductorUid).orderBy('fecha', 'desc').limit(3)
      ).valueChanges().subscribe(viajes => {
        if (viajes.length > 0) {
          this.viajes = viajes;
        }
      });
    }
  }


}
