import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';
import { RegisterPage } from '../../registration/register-pas/register.page';

const routes: Routes = [
  { path: '',component: InicioPage},
  { path: 'register', component: RegisterPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
