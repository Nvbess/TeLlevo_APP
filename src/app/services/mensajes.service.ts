import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  

  constructor() { }

  mensaje(icon:any, title:any, text:any) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: 'OK',
      heightAuto: false,
    });
  }

  mensajeActualizar(title:any) {
    return Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.mensaje('success', 'Confirmado', 'Se guardaron los cambios');
      } else if (result.isDenied) {
        this.mensaje('info', 'Cancelado', 'No se guardaron cambios');
      }
    });
  }

  async mostrarMensajeCarga(titulo: string, mensaje: string, duracion: number) {
    let timerInterval: any;
    return Swal.fire({
        title: titulo,
        html: mensaje + '<br/><b></b>',
        timer: duracion,
        timerProgressBar: true,
        heightAuto: false,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()?.querySelector("b");
            if (timer) {
                const updateTimerText = () => {
                    const timerLeft = Swal.getTimerLeft();
                    if (timerLeft !== undefined && timerLeft !== null) { 
                        timer.textContent = `${timerLeft / 1000} segundos restantes`;
                    }
                };
                updateTimerText();
                timerInterval = setInterval(updateTimerText, 100); 
            }
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    });
  }



}
