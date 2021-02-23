import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEmailPage } from './new-email.page';

const routes: Routes = [
  {
    path: '',
    component: NewEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEmailPageRoutingModule {}
