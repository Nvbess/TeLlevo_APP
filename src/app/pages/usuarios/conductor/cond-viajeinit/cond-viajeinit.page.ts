import { MensajesService } from './../../../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';


@Component({
  selector: 'app-cond-viajeinit',
  templateUrl: './cond-viajeinit.page.html',
  styleUrls: ['./cond-viajeinit.page.scss'],
})
export class CondViajeinitPage implements OnInit {

  viajeId: string | null = null;
  viaje: Viaje | null | undefined;
  pasajeros: { id: string; nombre: string; apellido: string; estado: string }[] = [];
  qrValue = '';
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viajeService: ViajesService,
    private fireStore: AngularFirestore,
    private MensajesService: MensajesService,
    private toastController: ToastController,
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
        this.loadPasajerosInfo(viajeData.pasajerosUids, viajeData.pasajerosEstados);
      }
    });
  }

  loadPasajerosInfo(pasajerosIDs: string[], pasajerosEstados: { [uid: string]: { estado: string } }) {
    this.pasajeros = []; // Reiniciar la lista de pasajeros

    // Obtener nombre, apellido y estado de cada pasajero
    pasajerosIDs.forEach((pasajeroID: string) => {
      this.fireStore.collection('usuarios').doc(pasajeroID).get().toPromise().then((userDoc) => {
        if (userDoc?.exists) {
          const userData = userDoc.data() as Usuario;
          const estado = pasajerosEstados[pasajeroID]?.estado || 'desconocido'; // Obtener el estado

          this.pasajeros.push({
            id: pasajeroID,
            nombre: userData.nombre,
            apellido: userData.apellido,
            estado: estado
          });
        }
      });
    });
  }

  // Método para eliminar pasajero del viaje
  eliminarPasajero(pasajeroID: string) {
    if (this.viajeId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'El pasajero será eliminado del viaje.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar pasajero',
        cancelButtonText: 'No, cancelar',
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Usamos el operador '!' para decir que estamos seguros que 'this.viajeId' no es null
          this.fireStore.collection('viajes').doc(this.viajeId!).update({
            pasajerosUids: this.viaje?.pasajerosUids.filter(id => id !== pasajeroID),
            [`pasajerosEstados.${pasajeroID}`]: firebase.firestore.FieldValue.delete() // Cambiar aquí
          }).then(() => {
            this.pasajeros = this.pasajeros.filter(pasajero => pasajero.id !== pasajeroID);
            Swal.fire({
              title: 'Eliminado!',
              text: 'El pasajero ha sido eliminado del viaje.',
              icon: 'success',
              heightAuto: false
            });
          });
        }
      });
    }
  }
  
  

  async empezarViaje() {
    if (this.viajeId && this.viaje) {
      
      const confirmados = Object.values(this.viaje.pasajerosEstados || {}).filter(
        (pasajero) => pasajero.estado === 'confirmado'
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
