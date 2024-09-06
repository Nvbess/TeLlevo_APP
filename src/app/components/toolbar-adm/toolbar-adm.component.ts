import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar-adm',
  templateUrl: './toolbar-adm.component.html',
  styleUrls: ['./toolbar-adm.component.scss'],
})
export class ToolbarAdmComponent  implements OnInit {

  constructor(private navControl: NavController) { }

  ngOnInit() {}

  goHome() {
    this.navControl.navigateForward('/admin-home');
  }

}
