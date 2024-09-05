import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCondPageRoutingModule } from './lista-cond-routing.module';

import { ListaCondPage } from './lista-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCondPageRoutingModule
  ],
  declarations: [ListaCondPage]
})
export class ListaCondPageModule {}
