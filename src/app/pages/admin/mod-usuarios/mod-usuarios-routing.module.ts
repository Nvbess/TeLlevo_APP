import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModUsuariosPage } from './mod-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: ModUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModUsuariosPageRoutingModule {}
