import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild('card', { static: false }) card!: ElementRef;

  constructor(private router: Router) { }


  ngOnInit() {
  }

  login() {
    this.router.navigate(['login']);
  }

  ToRegister() {
    if (this.card && this.card.nativeElement) {
      this.card.nativeElement.classList.add('expand');
    }
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 300);
  }
}
