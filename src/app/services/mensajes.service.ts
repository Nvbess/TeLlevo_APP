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

}
