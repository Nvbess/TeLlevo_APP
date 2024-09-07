import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondViajeinitPage } from './cond-viajeinit.page';

const routes: Routes = [
  {
    path: '',
    component: CondViajeinitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondViajeinitPageRoutingModule {}
