import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./groups/groups.module').then((m) => m.GroupsModule)
  },
  {
    path: ':groupId/students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule)
  },
  {
    path: ':groupId/students/:studentId/homeworks',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule)
  },
  {
    path: ':groupId/students/:studentId/homeworks/:homeworkId',
    loadChildren: () =>
      import('./student-info/student-info.module').then(
        (m) => m.StudentInfoModule
      )
  },
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworkRoutingModule {}
