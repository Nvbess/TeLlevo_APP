import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarCondComponent } from '../toolbar-cond/toolbar-cond.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ToolbarCondComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [ToolbarCondComponent]
})
export class CondtoolbarModule { }
