import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjDetviajePageRoutingModule } from './pj-detviaje-routing.module';

import { PjDetviajePage } from './pj-detviaje.page';
import { PastoolbarModule } from 'src/app/components/pastoolbar/pastoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjDetviajePageRoutingModule,
    PastoolbarModule
  ],
  declarations: [PjDetviajePage]
})
export class PjDetviajePageModule {}
