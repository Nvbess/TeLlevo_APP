import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoRegPageRoutingModule } from './tipo-reg-routing.module';

import { TipoRegPage } from './tipo-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoRegPageRoutingModule
  ],
  declarations: [TipoRegPage]
})
export class TipoRegPageModule {}
