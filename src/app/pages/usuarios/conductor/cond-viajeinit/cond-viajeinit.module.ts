import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondViajeinitPageRoutingModule } from './cond-viajeinit-routing.module';

import { CondViajeinitPage } from './cond-viajeinit.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondViajeinitPageRoutingModule,
    CondtoolbarModule,
    QrCodeModule
  ],
  declarations: [CondViajeinitPage]
})
export class CondViajeinitPageModule {}
