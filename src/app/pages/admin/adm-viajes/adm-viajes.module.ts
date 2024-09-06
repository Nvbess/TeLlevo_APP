import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmViajesPageRoutingModule } from './adm-viajes-routing.module';

import { AdmViajesPage } from './adm-viajes.page';
import { AdmtoolbarModule } from 'src/app/components/admtoolbar/admtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmViajesPageRoutingModule,
    AdmtoolbarModule
  ],
  declarations: [AdmViajesPage]
})
export class AdmViajesPageModule {}
