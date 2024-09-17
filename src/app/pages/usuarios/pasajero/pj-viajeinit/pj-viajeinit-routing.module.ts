import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjViajeinitPage } from './pj-viajeinit.page';

const routes: Routes = [
  {
    path: '',
    component: PjViajeinitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjViajeinitPageRoutingModule {}
