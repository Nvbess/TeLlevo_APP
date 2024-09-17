import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router: Router,
              private menuController: MenuController
  ) { }


  ngOnInit() {
    this.menuController.enable(false);
  }

  login() {
    this.router.navigate(['login']);
  }

  ToRegister() {
      this.router.navigate(['/register']);
  }
}
