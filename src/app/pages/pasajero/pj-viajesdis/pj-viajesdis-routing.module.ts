import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PjViajesdisPage } from './pj-viajesdis.page';

const routes: Routes = [
  {
    path: '',
    component: PjViajesdisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PjViajesdisPageRoutingModule {}
