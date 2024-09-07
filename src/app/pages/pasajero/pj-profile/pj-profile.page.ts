import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pj-profile',
  templateUrl: './pj-profile.page.html',
  styleUrls: ['./pj-profile.page.scss'],
})
export class PjProfilePage implements OnInit {

  public tipoUsuario?: string;
  public emailUsuario?: string;
  public nombreUsuario?: string;
  public apellUsuario?: string;
  public celUsuario?: string;

  constructor(private menuController: MenuController) { }

  ngOnInit() {
    this.menuController.enable(true);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.nombreUsuario = user.nombre;
      this.apellUsuario = user.apellido;
      this.celUsuario = user.celular;
    }
  }

}
