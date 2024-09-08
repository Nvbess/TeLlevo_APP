import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjQrPageRoutingModule } from './pj-qr-routing.module';

import { PjQrPage } from './pj-qr.page';
import { PastoolbarModule } from 'src/app/components/pastoolbar/pastoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjQrPageRoutingModule,
    PastoolbarModule
  ],
  declarations: [PjQrPage]
})
export class PjQrPageModule {}
