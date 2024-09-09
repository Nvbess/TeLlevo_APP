import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondDetviajePage } from './cond-detviaje.page';

const routes: Routes = [
  {
    path: '',
    component: CondDetviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondDetviajePageRoutingModule {}
