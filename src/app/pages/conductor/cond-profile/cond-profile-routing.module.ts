import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondProfilePage } from './cond-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CondProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondProfilePageRoutingModule {}
