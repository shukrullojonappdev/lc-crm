import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule)
  },
  {
    path: ':groupId/homeworks',
    loadChildren: () =>
      import('./homeworks/homeworks-routing.module').then(
        (m) => m.HomeworksRoutingModule
      )
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule {}
