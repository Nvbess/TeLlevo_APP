import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondEditprofilePageRoutingModule } from './cond-editprofile-routing.module';

import { CondEditprofilePage } from './cond-editprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondEditprofilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CondEditprofilePage]
})
export class CondEditprofilePageModule {}
