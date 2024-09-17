import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondActividadPage } from './cond-actividad.page';

const routes: Routes = [
  {
    path: '',
    component: CondActividadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondActividadPageRoutingModule {}
