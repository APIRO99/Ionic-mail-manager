import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEmailPageRoutingModule } from './new-email-routing.module';

import { NewEmailPage } from './new-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEmailPageRoutingModule
  ],
  declarations: [NewEmailPage]
})
export class NewEmailPageModule {}
