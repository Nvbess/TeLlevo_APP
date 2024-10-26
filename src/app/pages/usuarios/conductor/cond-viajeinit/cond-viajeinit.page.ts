import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViajesService } from 'src/app/services/firebase/viajes.service';
import { Viaje } from 'src/app/interfaces/viaje';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cond-viajeinit',
  templateUrl: './cond-viajeinit.page.html',
  styleUrls: ['./cond-viajeinit.page.scss'],
})
export class CondViajeinitPage implements OnInit {

  viajeId: string | null = null;
  viaje: Viaje | null | undefined;
  pasajeros: string[] = [];
  qrValue= '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viajeService: ViajesService,
    private fireStore: AngularFirestore
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

  empezarViaje() {
    if (this.viajeId) {
      this.fireStore.collection('viajes').doc(this.viajeId).update({
        estado: 'en curso'
      })
    }
  }

  finalizarViaje() {
    if (this.viajeId) {
      this.fireStore.collection('viajes').doc(this.viajeId).update({
        estado: 'finalizado'
      }).then(() => {
        this.router.navigate(['/conductor-home']);
      })
    }
  }
}
