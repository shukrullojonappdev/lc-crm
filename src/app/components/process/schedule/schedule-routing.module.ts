import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'groups',
        loadChildren: () =>
          import('./groups/groups.module').then((m) => m.GroupsModule)
      },
      {
        path: 'groups/:id',
        loadChildren: () =>
          import('./table/table.module').then((m) => m.TableModule)
      },
      {
        path: '',
        redirectTo: 'groups',
        pathMatch: 'prefix'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {}
