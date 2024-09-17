import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjProfilePageRoutingModule } from './pj-profile-routing.module';

import { PjProfilePage } from './pj-profile.page';
import { PastoolbarModule } from 'src/app/components/pastoolbar/pastoolbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjProfilePageRoutingModule,
    PastoolbarModule
  ],
  declarations: [PjProfilePage]
})
export class PjProfilePageModule {}
