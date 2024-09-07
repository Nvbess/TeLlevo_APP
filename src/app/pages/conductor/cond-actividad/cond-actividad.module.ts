import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondActividadPageRoutingModule } from './cond-actividad-routing.module';

import { CondActividadPage } from './cond-actividad.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondActividadPageRoutingModule,
    CondtoolbarModule
  ],
  declarations: [CondActividadPage]
})
export class CondActividadPageModule {}
