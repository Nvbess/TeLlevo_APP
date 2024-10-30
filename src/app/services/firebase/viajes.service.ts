import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../../interfaces/viaje';
import firebase from 'firebase/compat/app'; 
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private collectionName = 'viajes';
  private apiKey = environment.googleApiKey;

  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

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

  // LISTAR VIAJE EN CURSO
  getViajeEnCurso(conductorUid: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>(this.collectionName, ref => ref
      .where('conductorUid', '==', conductorUid)
      .where('estado', '==', 'en curso')
    ).valueChanges();
  }

  // OBTENER VIAJE
  getViaje(id: string): Observable<Viaje | undefined> {
    return this.firestore.collection('viajes').doc<Viaje>(id).valueChanges();
  }

  // VIAJES SERVICE
  // AGREGAR PASAJERO con verificación de capacidad
  async addPasajeroReserva(viajeId: string, pasajeroUid: string): Promise<void> {
    const viajeRef = this.firestore.collection('viajes').doc(viajeId);
    const viajeSnapshot = await viajeRef.get().toPromise();
  
    if (viajeSnapshot?.exists) {
      const viajeData = viajeSnapshot.data() as Viaje;
  
      if (viajeData.pasajerosUids.length < viajeData.capacidad) {
        await viajeRef.update({
          pasajerosUids: firebase.firestore.FieldValue.arrayUnion(pasajeroUid),
          [`pasajerosEstados.${pasajeroUid}`]: { estado: 'reservado' }
        });
      } else {
        throw new Error("Capacidad máxima alcanzada");
      }
    } else {
      throw new Error("Viaje no encontrado");
    }
  }

  // VIAJES SERVICE
  // AGREGAR PASAJERO con verificación de capacidad
  async addPasajero(viajeId: string, pasajeroUid: string): Promise<void> {
    const viajeRef = this.firestore.collection('viajes').doc(viajeId);
    const viajeSnapshot = await viajeRef.get().toPromise();
  
    if (viajeSnapshot?.exists) {
      const viajeData = viajeSnapshot.data() as Viaje;
  
      // Verificar si la capacidad ya está llena
      if (viajeData.pasajerosUids.length < viajeData.capacidad) {
        await viajeRef.update({
          pasajerosUids: firebase.firestore.FieldValue.arrayUnion(pasajeroUid),
          [`pasajerosEstados.${pasajeroUid}`]: { estado: 'confirmado' }
        });
      } else {
        throw new Error("Capacidad máxima alcanzada");
      }
    } else {
      throw new Error("Viaje no encontrado");
    }
  }
  
  // OBTENER VIAJE POR PASAJERO
  getViajePorPasajero(userId: string): Observable<Viaje[]> {
    return this.firestore.collection<Viaje>('viajes', ref => 
      ref.where('pasajerosUids', 'array-contains', userId)
         .where('estado', 'in', ['en curso', 'en espera']) // Asegúrate de que estos sean los estados correctos
    ).valueChanges();
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

  async obtenerCoordenadas(direccion: string): Promise<{ lat: number; lng: number }> {
    if (!direccion) {
      throw new Error("La dirección no puede estar vacía");
    }
  
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${this.apiKey}`;
    
    return this.http.get<any>(geocodingUrl).toPromise().then(response => {
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error("No se pudo obtener la geocodificación");
      }
    });
  }


  async deshabilitarUsuarioEnViajes(uid: string) {
    try {
      const viajesSnapshot = await this.firestore.collection('viajes').get().toPromise();
  
      if (viajesSnapshot && !viajesSnapshot.empty) {
        viajesSnapshot.forEach(async (viajeDoc) => {
          const viajeData = viajeDoc.data() as any;
  
          if (viajeData && viajeData.pasajeros) {
            const pasajerosActualizados = viajeData.pasajeros.filter((id: string) => id !== uid);
  
            await this.firestore.collection('viajes').doc(viajeDoc.id).update({
              pasajeros: pasajerosActualizados,
            });
          }
        });
        console.log(`Usuario ${uid} eliminado de los viajes en los que participaba.`);
      } else {
        console.log("No se encontraron viajes o el snapshot está vacío.");
      }
    } catch (error) {
      console.error("Error al deshabilitar usuario en los viajes:", error);
    }
  }
  
}
