import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'homework',
    loadChildren: () =>
      import('./homework/homework.module').then((m) => m.HomeworkModule)
  },
  {
    path: '',
    redirectTo: 'homework',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule {}
