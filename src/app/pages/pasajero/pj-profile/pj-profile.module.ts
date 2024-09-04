import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjProfilePageRoutingModule } from './pj-profile-routing.module';

import { PjProfilePage } from './pj-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjProfilePageRoutingModule
  ],
  declarations: [PjProfilePage]
})
export class PjProfilePageModule {}
