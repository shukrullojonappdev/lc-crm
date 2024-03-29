import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'groups',
    loadChildren: () =>
      import('./homework/homework.module').then((m) => m.HomeworkModule)
  },
  {
    path: 'timetable',
    loadChildren: () =>
      import('./timetable/timetable.module').then((m) => m.TimetableModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
