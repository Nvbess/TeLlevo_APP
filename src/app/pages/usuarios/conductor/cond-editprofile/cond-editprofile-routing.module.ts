import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondEditprofilePage } from './cond-editprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CondEditprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondEditprofilePageRoutingModule {}
