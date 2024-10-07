import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModUsuariosPageRoutingModule } from './mod-usuarios-routing.module';

import { ModUsuariosPage } from './mod-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModUsuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModUsuariosPage]
})
export class ModUsuariosPageModule {}
