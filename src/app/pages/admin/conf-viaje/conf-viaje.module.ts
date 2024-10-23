import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfViajePageRoutingModule } from './conf-viaje-routing.module';

import { ConfViajePage } from './conf-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfViajePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfViajePage]
})
export class ConfViajePageModule {}
