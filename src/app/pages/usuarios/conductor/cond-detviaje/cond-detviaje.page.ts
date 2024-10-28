import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-cond-detviaje',
  templateUrl: './cond-detviaje.page.html',
  styleUrls: ['./cond-detviaje.page.scss'],
})
export class CondDetviajePage implements OnInit {

  viaje?: Viaje;
  viajeUid?: string = '';
  viajeFecha?: string | null;
  viajeHora?: string | null;
  viajeCosto?: number | null;
  viajeID?: string | null;
  conductorID?: string | null;
  nombreConductor?: string | null;
  apellidoConductor?: string | null;
  pasajeroIDs?: string[] | null;
  nombrePasajero?: string | null;
  apellidoPasajero?: string | null;
  viajeOrigen?: string | null;
  viajeDestino?: string | null;
  viajeImagen?: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.viajeUid = this.activatedRoute.snapshot.paramMap.get('uid') as string;
  
    if (this.viajeUid) {
      this.firestore.collection('viajes', ref => ref.where('id', '==', this.viajeUid)).get().subscribe((querySnapshot) => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const viajeData = doc.data() as Viaje;
  
          this.viaje = viajeData;
          this.viajeFecha = viajeData.fecha;
          this.viajeHora = viajeData.hora;
          this.viajeCosto = viajeData.costo;
          this.viajeID = viajeData.id;
          this.conductorID = viajeData.conductorUid;
          this.pasajeroIDs = viajeData.pasajerosUids;
          this.viajeOrigen = viajeData.origen;
          this.viajeDestino = viajeData.destino;
          this.viajeImagen = viajeData.imagenMapa;
  
          this.firestore.collection('usuarios').doc(this.conductorID).get().toPromise().then((userDoc) => {
            if (userDoc?.exists) {
              const userData = userDoc.data() as Usuario;
              this.nombreConductor = userData.nombre;
              this.apellidoConductor = userData.apellido;
            }
          });
  
          this.pasajeroIDs?.forEach((pasajeroID: string) => {
            this.firestore.collection('usuarios').doc(pasajeroID).get().toPromise().then((userDoct) => {
              if (userDoct?.exists) {
                const userData = userDoct.data() as Usuario;
                this.nombrePasajero = userData.nombre;
                this.apellidoPasajero = userData.apellido;
              }
            });
          });
        }
      });
    }
  }  

}
