import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjQrPage } from './pj-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PjQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjQrPageRoutingModule {}
