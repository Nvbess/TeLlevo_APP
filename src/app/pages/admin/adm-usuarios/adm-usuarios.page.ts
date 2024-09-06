import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.config()
  }

  config() {
    this.usuarios = this.usuarioService.getUsuarios();
  }

}
