import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetUsuariosPage } from './det-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: DetUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetUsuariosPageRoutingModule {}
