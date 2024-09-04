import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjProfilePage } from './pj-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PjProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjProfilePageRoutingModule {}
