import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-pj-aceptarviaje',
  templateUrl: './pj-aceptarviaje.page.html',
  styleUrls: ['./pj-aceptarviaje.page.scss'],
})
export class PjAceptarviajePage implements OnInit {

  viajeId?: string;
  imagenMapa?: string;

  constructor(private route: ActivatedRoute, private fireStore: AngularFirestore) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.viajeId = id;
      this.cargarImagenMapa();
    }
  }

  cargarImagenMapa() {
    // Obtener la URL de la imagen almacenada en Firebase para el viaje
    this.fireStore.collection('viajes').doc(this.viajeId).valueChanges().subscribe((viaje: any) => {
      this.imagenMapa = viaje?.imagenmapa || '';  // Asegúrate de que imagenmapa exista en Firebase
    });
  }

  escanearQR() {
    console.log("Escaneando QR...");
  }

}
