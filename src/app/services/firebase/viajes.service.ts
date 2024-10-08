import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../../interfaces/viaje';
import firebase from 'firebase/compat/app'; 

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private collectionName = 'viajes';

  constructor(private firestore: AngularFirestore) { }

  // Crear un nuevo viaje
  addViaje(viaje: Viaje): Promise<any> {
    return this.firestore.collection('viajes').add(viaje);
  }

  // Obtener la lista de viajes
  getViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }
  // Método para obtener el viaje en curso del conductor
  getViajeEnCurso(conductorUid: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>(this.collectionName, ref => ref
      .where('conductorUid', '==', conductorUid)
      .where('estado', '==', 'en curso')
    ).valueChanges();
  }

  // Obtener un viaje por ID
  getViaje(id: string): Observable<Viaje | undefined> {
    return this.firestore.collection('viajes').doc<Viaje>(id).valueChanges();
  }

  // Agregar un pasajero al viaje
  addPasajero(viajeId: string, pasajeroUid: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({
      pasajerosUids: firebase.firestore.FieldValue.arrayUnion(pasajeroUid)
    });
  }

  // Eliminar un pasajero del viaje
  delPasajero(viajeId: string, pasajeroUid: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({
      pasajerosUids: firebase.firestore.FieldValue.arrayRemove(pasajeroUid)
    });
  }

  // Actualizar un viaje
  updViaje(viajeId: string, updatedViaje: Partial<Viaje>): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update(updatedViaje);
  }

  // Eliminar un viaje
  delViaje(viajeId: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).delete();
  }
}
