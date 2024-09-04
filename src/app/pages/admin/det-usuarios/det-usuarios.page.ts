import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-det-usuarios',
  templateUrl: './det-usuarios.page.html',
  styleUrls: ['./det-usuarios.page.scss'],
})
export class DetUsuariosPage implements OnInit {

  userEmail?: string | null;
  usuario?: Usuario;
  userNombre?: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
    this.userEmail = this.activatedRoute.snapshot.paramMap.get('email');
    if(this.userEmail) {
      this.usuario = this.usuarioService.getUsuario(this.userEmail);
      if(this.usuario) {
        this.userNombre = this.usuario.nombre;
      }
    }
  }

}
