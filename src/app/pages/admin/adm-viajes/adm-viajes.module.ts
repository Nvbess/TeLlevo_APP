import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmViajesPageRoutingModule } from './adm-viajes-routing.module';

import { AdmViajesPage } from './adm-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmViajesPageRoutingModule
  ],
  declarations: [AdmViajesPage]
})
export class AdmViajesPageModule {}
