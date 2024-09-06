import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetUsuariosPageRoutingModule } from './det-usuarios-routing.module';

import { DetUsuariosPage } from './det-usuarios.page';
import { AdmtoolbarModule } from 'src/app/components/admtoolbar/admtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetUsuariosPageRoutingModule,
    AdmtoolbarModule
  ],
  declarations: [DetUsuariosPage]
})
export class DetUsuariosPageModule {}
