import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-usuarios',
  templateUrl: './mod-usuarios.page.html',
  styleUrls: ['./mod-usuarios.page.scss'],
})
export class ModUsuariosPage implements OnInit {

  editUserForm: FormGroup;
  uid: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private mensajeService: MensajesService,
  ) {
    this.editUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      modeloAuto: ['',],
      patenteAuto: ['',],
    });
  }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('uid') as string;
    this.loadData();
  }

  loadData() {
    // CARGAMOS LA INFORMACION DESDE LA BD
    this.firestore
      .collection('usuarios')
      .doc(this.uid)
      .get()
      .toPromise()
      .then((user) => {
        if (user) {
          const userData = user?.data() as Usuario;
          this.editUserForm.patchValue({
            email: userData.email,
            nombre: userData.nombre,
            apellido: userData.apellido,
            pass: userData.pass,
            tipo: userData.tipo,
            modeloAuto: userData.modeloAuto,
            patenteAuto: userData.patenteAuto,
          });
        }
      })
      .catch((error) => {});
  }

  async updateUser() {
    Swal.fire({
      title: 'Seguro que deseas confirmar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar",
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.firestore.collection('usuarios').doc(this.uid).update(this.editUserForm.value).then(() => {})
        this.mensajeService.mensaje('success', 'Confirmado', 'Se guardaron los cambios');
        this.router.navigateByUrl(`/usuarios/${this.uid}`);
      } else if (result.isDenied) {
        this.mensajeService.mensaje('info', 'Cancelado', 'No se guardaron cambios');
        this.router.navigateByUrl(`/usuarios/${this.uid}`);
      }
    })
  }
}
