import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjEditprofilePageRoutingModule } from './pj-editprofile-routing.module';

import { PjEditprofilePage } from './pj-editprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjEditprofilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PjEditprofilePage]
})
export class PjEditprofilePageModule {}
