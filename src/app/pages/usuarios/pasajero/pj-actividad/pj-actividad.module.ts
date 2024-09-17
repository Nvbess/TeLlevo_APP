import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjActividadPageRoutingModule } from './pj-actividad-routing.module';

import { PjActividadPage } from './pj-actividad.page';
import { PastoolbarModule } from 'src/app/components/pastoolbar/pastoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjActividadPageRoutingModule,
    PastoolbarModule
  ],
  declarations: [PjActividadPage]
})
export class PjActividadPageModule {}
