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

  // CREAR VIAJE
  async addViaje(viaje: Viaje) {
    const viajeRef = await this.firestore.collection('viajes').add(viaje);
    const id = viajeRef.id;
    
    await this.firestore.collection('viajes').doc(id).update({ id });
  
    return viajeRef;
  }

  // LISTAR VIAJE
  getViajes(): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes').valueChanges();
  }

  // LISTAR VIAJES POR CONDUCTOR
  getViajesPorConductor(conductorUid: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes', ref =>
      ref.where('conductorUid', '==', conductorUid).orderBy('fecha', 'desc')
    ).valueChanges();
  }

  // LISTAR VIAJE EN ESPERA
  getViajeEnEspera(conductorUid: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>(this.collectionName, ref => ref
      .where('conductorUid', '==', conductorUid)
      .where('estado', '==', 'en espera')
    ).valueChanges();
  }

  // OBTENER VIAJE
  getViaje(id: string): Observable<Viaje | undefined> {
    return this.firestore.collection('viajes').doc<Viaje>(id).valueChanges();
  }

  // AGREGAR PASAJERO
  addPasajero(viajeId: string, pasajeroUid: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({
      pasajerosUids: firebase.firestore.FieldValue.arrayUnion(pasajeroUid)
    });
  }

  // ELIMINAR PASAJERO
  delPasajero(viajeId: string, pasajeroUid: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update({
      pasajerosUids: firebase.firestore.FieldValue.arrayRemove(pasajeroUid)
    });
  }

  // ACTUALIZAR PASAJERO
  updViaje(viajeId: string, updatedViaje: Partial<Viaje>): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).update(updatedViaje);
  }

  // ELIMINAR PASAJERO
  delViaje(viajeId: string): Promise<void> {
    return this.firestore.collection('viajes').doc(viajeId).delete();
  }
}
