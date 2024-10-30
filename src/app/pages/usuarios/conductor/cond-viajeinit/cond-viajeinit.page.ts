import { MensajesService } from './../../../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cond-viajeinit',
  templateUrl: './cond-viajeinit.page.html',
  styleUrls: ['./cond-viajeinit.page.scss'],
})
export class CondViajeinitPage implements OnInit {

  viajeId: string | null = null;
  viaje: Viaje | null | undefined;
  pasajeros: string[] = [];
  qrValue = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viajeService: ViajesService,
    private fireStore: AngularFirestore,
    private MensajesService: MensajesService,
  ) { }

  ngOnInit() {
    this.viajeId = this.route.snapshot.paramMap.get('id');
    if (this.viajeId) {
      this.loadViaje(this.viajeId);
      this.qrValue = this.viajeId; 
    }
  }

  loadViaje(viajeId: string) {
    this.viajeService.getViaje(viajeId).subscribe((viajeData) => {
      this.viaje = viajeData;
      if (viajeData) {
        this.pasajeros = viajeData.pasajerosUids;
      }
    });
  }

  async empezarViaje() {
    if (this.viajeId && this.viaje) {
      
      const confirmados = Object.values(this.viaje.pasajerosEstados || {}).filter(
        (estado) => estado === 'confirmado'
      );
  
      console.log('Confirmados:', confirmados);
  
      if (confirmados.length > 0) {
        await this.fireStore.collection('viajes').doc(this.viajeId).update({
          estado: 'en curso'
        });
        this.router.navigate(['/conductor-home']);
      } else {
        this.MensajesService.mensaje('error','Error','Debe haber al menos un pasajero confirmado para empezar el viaje.');
      }
    }
  }
  
  
  
  
  
  
  
  
  

  cancelarViaje() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar viaje',
      cancelButtonText: 'No, mantener viaje',
      heightAuto: false  
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.viajeId) {
          this.fireStore.collection('viajes').doc(this.viajeId).delete().then(() => {
            Swal.fire({
              title: 'Cancelado',
              text: 'El viaje ha sido cancelado.',
              icon: 'success',
              confirmButtonText: 'OK',
              heightAuto: false  
            }).then(() => {
              this.router.navigate(['/conductor-home']);
            });
          });
        }
      }
    });
  }

}
