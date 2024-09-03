import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCondPage } from './register-cond.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCondPageRoutingModule {}
