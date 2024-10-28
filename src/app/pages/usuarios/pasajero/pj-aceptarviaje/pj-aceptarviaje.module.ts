import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PjAceptarviajePageRoutingModule } from './pj-aceptarviaje-routing.module';

import { PjAceptarviajePage } from './pj-aceptarviaje.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PjAceptarviajePageRoutingModule
  ],
  declarations: [PjAceptarviajePage, BarcodeScanningModalComponent]
})
export class PjAceptarviajePageModule {}
