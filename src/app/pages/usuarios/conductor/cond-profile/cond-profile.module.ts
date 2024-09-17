import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondProfilePageRoutingModule } from './cond-profile-routing.module';

import { CondProfilePage } from './cond-profile.page';
import { CondtoolbarModule } from 'src/app/components/condtoolbar/condtoolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondProfilePageRoutingModule,
    CondtoolbarModule
  ],
  declarations: [CondProfilePage]
})
export class CondProfilePageModule {}
