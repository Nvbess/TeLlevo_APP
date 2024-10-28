import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conf-viaje',
  templateUrl: './conf-viaje.page.html',
  styleUrls: ['./conf-viaje.page.scss'],
})
export class ConfViajePage implements OnInit {

  editViajeForm: FormGroup;
  uid: string = '';
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
  viajeEstado?: string | null;
  viajeImagen?: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private mensajeService: MensajesService,
  ) {
    this.editViajeForm = this.formBuilder.group({
      fecha: ['', [Validators.required, Validators.email ]],
      hora: ['', [Validators.required]],
      costo: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      destino: ['',],
      origen: ['',],
      imagenMapa: ['',],
      id: ['',],
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadData();
  }

  async loadData() {
    try {
      const viajeDoc = await this.firestore.collection('viajes').doc(this.uid).get().toPromise();
      if (viajeDoc) {
        const viajeData = viajeDoc.data() as Viaje;

          this.viaje = viajeData;
          this.viajeFecha = viajeData.fecha;
          this.viajeHora = viajeData.hora;
          this.viajeCosto = viajeData.costo;
          this.viajeID = viajeData.id;
          this.conductorID = viajeData.conductorUid;
          this.pasajeroIDs = viajeData.pasajerosUids;
          this.viajeOrigen = viajeData.origen;
          this.viajeDestino = viajeData.destino;
          this.viajeEstado = viajeData.estado;
          this.viajeImagen = viajeData.imagenMapa;
  
        const userDoc = await this.firestore.collection('usuarios').doc(viajeData.conductorUid).get().toPromise();
        if (userDoc?.exists) {
          const userData = userDoc.data() as Usuario;
          this.nombreConductor = userData.nombre;
          this.apellidoConductor = userData.apellido;
        }
  
        const pasajerosNombres: string[] = [];
        for (const pasajeroUid of viajeData.pasajerosUids) {
          const pasajeroDoc = await this.firestore.collection('usuarios').doc(pasajeroUid).get().toPromise();
          if (pasajeroDoc?.exists) {
            const pasajeroData = pasajeroDoc.data() as Usuario;
            pasajerosNombres.push(`${pasajeroData.nombre} ${pasajeroData.apellido}`);
          }
        }
  
        this.editViajeForm.patchValue({
          fecha: viajeData.fecha,
          hora: viajeData.hora,
          costo: viajeData.costo,
          estado: viajeData.estado,
          destino: viajeData.destino,
          origen: viajeData.origen,
          imagenMapa: viajeData.imagenMapa,
          id: viajeData.id,
          

        });
      }
    } catch (error) {
      this.mensajeService.mensaje('Error', 'Error', 'No se encontraron datos');
    }
  }

  async updateViaje() {
    Swal.fire({
      title: 'Seguro que deseas confirmar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.firestore.collection('viajes').doc(this.uid).update(this.editViajeForm.value).then(() => {})
        this.mensajeService.mensaje('success', 'Confirmado', 'Se guardaron los cambios');
        this.router.navigateByUrl(`/det-viajes/${this.uid}`);
      } else if (result.isDenied) {
        this.mensajeService.mensaje('info', 'Cancelado', 'No se guardaron cambios');
        this.router.navigateByUrl(`/det-viajes/${this.uid}`);
      }
    })
  }
}
