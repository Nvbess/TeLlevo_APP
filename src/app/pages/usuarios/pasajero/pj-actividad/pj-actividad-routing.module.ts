import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjActividadPage } from './pj-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: PjActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjActividadPageRoutingModule {}
