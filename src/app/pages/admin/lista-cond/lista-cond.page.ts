import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-cond',
  templateUrl: './lista-cond.page.html',
  styleUrls: ['./lista-cond.page.scss'],
})
export class ListaCondPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.usuariosService.getUsuarios().filter(aux => aux.tipo === 'conductor');
  }

}

