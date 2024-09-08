import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjDetviajePage } from './pj-detviaje.page';

const routes: Routes = [
  {
    path: '',
    component: PjDetviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjDetviajePageRoutingModule {}
