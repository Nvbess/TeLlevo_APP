import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondDetviajePageRoutingModule } from './cond-detviaje-routing.module';

import { CondDetviajePage } from './cond-detviaje.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondDetviajePageRoutingModule,
    CondtoolbarModule
  ],
  declarations: [CondDetviajePage]
})
export class CondDetviajePageModule {}
