import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCondPageRoutingModule } from './register-cond-routing.module';

import { RegisterCondPage } from './register-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCondPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterCondPage]
})
export class RegisterCondPageModule {}
