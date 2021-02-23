import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [

      {
        path: 'users',
        loadChildren: () => import('../users/users.module')
          .then( m => m.UsersPageModule)
      },
      {
        path: 'new-email',
        loadChildren: () => import('../new-email/new-email.module')
          .then(m => m.NewEmailPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module')
          .then(m => m.HistoryPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
