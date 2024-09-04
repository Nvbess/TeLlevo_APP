import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tipo-reg',
  templateUrl: './tipo-reg.page.html',
  styleUrls: ['./tipo-reg.page.scss'],
})
export class TipoRegPage implements OnInit {

  constructor(private router: Router,
              private menuController: MenuController
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
  }

  registerPas() {
    this.router.navigate(['register']);
  }

  registerCond() {
    this.router.navigate(['register-cond']);
  }
}
