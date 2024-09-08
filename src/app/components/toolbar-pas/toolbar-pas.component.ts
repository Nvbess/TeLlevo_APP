import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar-pas',
  templateUrl: './toolbar-pas.component.html',
  styleUrls: ['./toolbar-pas.component.scss'],
})
export class ToolbarPasComponent  implements OnInit {

  constructor(private navControl: NavController) { }

  ngOnInit() {}

  goHome() {
    this.navControl.navigateForward('/pasajero-home');
  }

  goPerfil() {
    this.navControl.navigateForward('/pj-profile');
  }

  goActividad() {
    this.navControl.navigateForward('/viajes-pas');
  }
}
