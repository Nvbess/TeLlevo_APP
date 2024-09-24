import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  recoveryForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder
  ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async recoveryPass(email: string) {
    try {
      await this.authService.recoverypass(email);
      Swal.fire({
        icon: 'success',
        title: 'Correo Enviado!',
        confirmButtonText: 'OK',
        heightAuto: false,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar!',
        confirmButtonText: 'OK',
        heightAuto: false,
      })
    }
  }
}

