import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAdminPageRoutingModule } from './perfil-admin-routing.module';

import { PerfilAdminPage } from './perfil-admin.page';
import { AdmtoolbarModule } from 'src/app/components/admtoolbar/admtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAdminPageRoutingModule,
    AdmtoolbarModule
  ],
  declarations: [PerfilAdminPage]
})
export class PerfilAdminPageModule {}
