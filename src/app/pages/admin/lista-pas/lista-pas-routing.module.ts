import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPasPage } from './lista-pas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPasPageRoutingModule {}
