import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEmailPageRoutingModule } from './new-email-routing.module';

import { NewEmailPage } from './new-email.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewEmailPageRoutingModule,
    QuillModule.forRoot(),
  ],
  declarations: [NewEmailPage]
})
export class NewEmailPageModule {}
