import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondViajeinitPageRoutingModule } from './cond-viajeinit-routing.module';

import { CondViajeinitPage } from './cond-viajeinit.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondViajeinitPageRoutingModule,
    CondtoolbarModule
  ],
  declarations: [CondViajeinitPage]
})
export class CondViajeinitPageModule {}
