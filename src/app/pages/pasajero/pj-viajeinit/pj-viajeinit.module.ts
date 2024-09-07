import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjViajeinitPageRoutingModule } from './pj-viajeinit-routing.module';

import { PjViajeinitPage } from './pj-viajeinit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjViajeinitPageRoutingModule
  ],
  declarations: [PjViajeinitPage]
})
export class PjViajeinitPageModule {}
