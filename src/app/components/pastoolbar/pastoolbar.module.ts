import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarPasComponent } from '../toolbar-pas/toolbar-pas.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ToolbarPasComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [ToolbarPasComponent],
})
export class PastoolbarModule { }
