import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Viaje } from 'src/app/interfaces/viaje';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-cond-viaje',
  templateUrl: './cond-viaje.page.html',
  styleUrls: ['./cond-viaje.page.scss'],
})
export class CondViajePage implements OnInit {
  viajeForm: FormGroup;

  origenValue?: string;
  destinoValue?: string;
  fechaValue?: string;
  horaValue?: string;
  valorValue?: number;
  capacidadValue?: number;
  asientosValue?: number;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private viajeService: ViajesService,
    private menuController: MenuController
  ) {
    this.viajeForm = this.formBuilder.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.menuController.enable(true);
  }

  /*async registerViaje() {
    if (this.viajeForm.valid) {
      const { uid, origen, destino, fecha, hora, costo, capacidad } =
        this.viajeForm.value;

      this.viajeService.addViaje(nuevoViaje);
      this.router.navigate(['/cond-viajeinit']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }*/
}
