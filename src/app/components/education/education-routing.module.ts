import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: 'topics',
    loadChildren: () =>
      import('./topics/topics.module').then((m) => m.TopicsModule)
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule)
  },
  {
    path: 'timetable',
    loadChildren: () =>
      import('./timetable/timetable.module').then((m) => m.TimetableModule)
  },
  {
    path: 'homeworks',
    loadChildren: () =>
      import('./homeworks/homeworks.module').then((m) => m.HomeworksModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule {}
