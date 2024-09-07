import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondViajePageRoutingModule } from './cond-viaje-routing.module';

import { CondViajePage } from './cond-viaje.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondViajePageRoutingModule,
    CondtoolbarModule
  ],
  declarations: [CondViajePage]
})
export class CondViajePageModule {}
