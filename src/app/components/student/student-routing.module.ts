import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'homeworks',
    loadChildren: () =>
      import('./homeworks/homeworks.module').then((m) => m.HomeworksModule)
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
