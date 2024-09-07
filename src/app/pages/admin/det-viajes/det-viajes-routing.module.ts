import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetViajesPage } from './det-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: DetViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetViajesPageRoutingModule {}
