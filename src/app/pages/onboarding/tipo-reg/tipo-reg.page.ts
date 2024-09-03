import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-reg',
  templateUrl: './tipo-reg.page.html',
  styleUrls: ['./tipo-reg.page.scss'],
})
export class TipoRegPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerPas() {
    this.router.navigate(['register']);
  }

  registerCond() {
    this.router.navigate(['register-cond']);
  }
}
