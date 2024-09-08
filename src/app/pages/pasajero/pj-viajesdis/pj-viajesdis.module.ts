import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjViajesdisPageRoutingModule } from './pj-viajesdis-routing.module';

import { PjViajesdisPage } from './pj-viajesdis.page';
import { PastoolbarModule } from 'src/app/components/pastoolbar/pastoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjViajesdisPageRoutingModule,
    PastoolbarModule
  ],
  declarations: [PjViajesdisPage]
})
export class PjViajesdisPageModule {}
