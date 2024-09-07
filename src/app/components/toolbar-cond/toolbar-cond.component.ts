import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar-cond',
  templateUrl: './toolbar-cond.component.html',
  styleUrls: ['./toolbar-cond.component.scss'],
})
export class ToolbarCondComponent  implements OnInit {

  constructor(private navControl: NavController) { }

  ngOnInit() {}

  goHome () {
    this.navControl.navigateForward('/conductor-home');
  }

  goPerfil() {
    this.navControl.navigateForward('/cond-profile');
  }

  goActividad() {
    this.navControl.navigateForward('/cond-actividad');
  }
}
