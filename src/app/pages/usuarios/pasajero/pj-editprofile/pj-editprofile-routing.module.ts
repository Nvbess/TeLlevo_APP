import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjEditprofilePage } from './pj-editprofile.page';

const routes: Routes = [
  {
    path: '',
    component: PjEditprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjEditprofilePageRoutingModule {}
