import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCondPage } from './lista-cond.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCondPageRoutingModule {}
