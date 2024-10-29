import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';

@Component({
  selector: 'app-det-viajes',
  templateUrl: './det-viajes.page.html',
  styleUrls: ['./det-viajes.page.scss'],
})
export class DetViajesPage implements OnInit {
  viaje?: Viaje;
  viajeUid?: string = '';
  viajeFecha?: string | null;
  viajeHora?: string | null;
  viajeCosto?: number | null;
  viajeID?: string | null;
  conductorID?: string | null;
  nombreConductor?: string | null;
  apellidoConductor?: string | null;
  pasajerosInfo: { id: string; nombre: string | null; apellido: string | null; estado: string }[] = []; // Arreglo para almacenar la info de los pasajeros
  viajeOrigen?: string | null;
  viajeDestino?: string | null;
  viajeEstado?: string | null;
  viajeImagen?: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {
    this.viajeUid = this.activatedRoute.snapshot.paramMap.get('id') as string;

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
          this.viajeOrigen = viajeData.origen;
          this.viajeDestino = viajeData.destino;
          this.viajeEstado = viajeData.estado;
          this.viajeImagen = viajeData.imagenMapa;

          // Obtener información del conductor
          this.firestore.collection('usuarios').doc(this.conductorID).get().toPromise().then((userDoc) => {
            if (userDoc?.exists) {
              const userData = userDoc.data() as Usuario;
              this.nombreConductor = userData.nombre;
              this.apellidoConductor = userData.apellido;
            }
          });

          this.getPasajerosInfo(viajeData.pasajerosUids);
        }
      });
    }
  }

  // Función para obtener información de los pasajeros
  private async getPasajerosInfo(pasajeroIDs: string[]) {
    for (const pasajeroID of pasajeroIDs) {
      const userDoc = await this.firestore.collection('usuarios').doc(pasajeroID).get().toPromise();
      if (userDoc?.exists) {
        const userData = userDoc.data() as Usuario;
  
        // Comprobar si viaje y pasajerosEstados existen
        const estado = this.viaje && this.viaje.pasajerosEstados && this.viaje.pasajerosEstados[pasajeroID]?.estado 
                       ? this.viaje.pasajerosEstados[pasajeroID].estado 
                       : 'desconocido';
        
        this.pasajerosInfo.push({
          id: pasajeroID,
          nombre: userData.nombre,
          apellido: userData.apellido,
          estado: estado,
        });
      }
    }
  }  
}
