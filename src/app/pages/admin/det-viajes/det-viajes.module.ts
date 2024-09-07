import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetViajesPageRoutingModule } from './det-viajes-routing.module';

import { DetViajesPage } from './det-viajes.page';
import { AdmtoolbarModule } from 'src/app/components/admtoolbar/admtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetViajesPageRoutingModule,
    AdmtoolbarModule
  ],
  declarations: [DetViajesPage]
})
export class DetViajesPageModule {}
