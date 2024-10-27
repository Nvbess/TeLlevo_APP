import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjAceptarviajePage } from './pj-aceptarviaje.page';

const routes: Routes = [
  {
    path: '',
    component: PjAceptarviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjAceptarviajePageRoutingModule {}
