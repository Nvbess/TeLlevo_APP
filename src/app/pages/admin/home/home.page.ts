import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ViajesService } from 'src/app/services/firebase/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  viajes: any = [];
  
  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;

  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) { }


  ngOnInit() {
    this.config()
    this.menuController.enable(true);
    this.checklogin();
  }

  async checklogin() {
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
        }
      }
    })
  }

  config() {
      this.fireStore.collection('viajes', ref => ref.limit(3)).valueChanges().subscribe(viajes => {
        if (viajes.length > 0) {
          this.viajes = viajes;
        }
      });
  }
  
}
