import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPasPageRoutingModule } from './lista-pas-routing.module';

import { ListaPasPage } from './lista-pas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPasPageRoutingModule
  ],
  declarations: [ListaPasPage]
})
export class ListaPasPageModule {}
