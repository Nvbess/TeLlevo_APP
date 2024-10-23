import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage implements OnInit {

  email: string ='';

  constructor(
    private authService: AuthService,
    private mensajeService: MensajesService
  ) {}

  ngOnInit() {}

  async recoveryEmail() {
    try {
      let timerInterval: any;
      this.mensajeService.mostrarMensajeCarga('Procesando','Enviando correo...', 2000)
      .then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          this.authService.recoveryPassword(this.email);
          this.mensajeService.mensaje('success','Correo enviado','Se ha enviado un correo para reetablecer tu contraseña!');
        }
      });
    } catch (error) {
      this.mensajeService.mensaje('error','Error','Hubo un problema al enviar el correo!');
    }
  }
}

