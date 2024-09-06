import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarAdmComponent } from '../toolbar-adm/toolbar-adm.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ToolbarAdmComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [ToolbarAdmComponent],
})
export class AdmtoolbarModule { }
