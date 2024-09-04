import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjActividadPageRoutingModule } from './pj-actividad-routing.module';

import { PjActividadPage } from './pj-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjActividadPageRoutingModule
  ],
  declarations: [PjActividadPage]
})
export class PjActividadPageModule {}
