import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondViajePage } from './cond-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: CondViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondViajePageRoutingModule {}
