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
  async addViaje(viaje: Viaje) {
    const viajeRef = await this.firestore.collection('viajes').add(viaje);
    const id = viajeRef.id;
    
    await this.firestore.collection('viajes').doc(id).update({ id });
  
    return viajeRef;
  }

  // Listar viajes
  getViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }

  // Obtener un viaje por Conductor
  getViajesPorConductor(conductorId: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes', ref =>
      ref.where('conductorId', '==', conductorId).orderBy('fecha', 'desc')
    ).valueChanges();
  }

  // Obtener un viaje en espera
  getViajeEnEspera(conductorUid: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>(this.collectionName, ref => ref
      .where('conductorUid', '==', conductorUid)
      .where('estado', '==', 'en espera')
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
