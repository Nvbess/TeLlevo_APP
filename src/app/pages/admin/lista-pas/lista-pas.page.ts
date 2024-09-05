import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-pas',
  templateUrl: './lista-pas.page.html',
  styleUrls: ['./lista-pas.page.scss'],
})
export class ListaPasPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosService.getUsuarios().filter(aux => aux.tipo === 'pasajero');
  }

}
