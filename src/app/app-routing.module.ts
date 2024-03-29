import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './guard/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: AppLayoutComponent,
          canActivate: [authGuard],
          children: [
            {
              path: '',
              loadChildren: () =>
                import('./components/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule
                )
            },
            {
              path: 'people',
              loadChildren: () =>
                import('./components/people/people.module').then(
                  (m) => m.PeopleModule
                )
            },
            {
              path: 'education',
              loadChildren: () =>
                import('./components/education/education.module').then(
                  (m) => m.EducationModule
                )
            },
            {
              path: 'places',
              loadChildren: () =>
                import('./components/places/places.module').then(
                  (m) => m.PlacesModule
                )
            },
            {
              path: 'process',
              loadChildren: () =>
                import('./components/process/process.module').then(
                  (m) => m.ProcessModule
                )
            },
            {
              path: 'student',
              loadChildren: () =>
                import('./components/student/student.module').then(
                  (m) => m.StudentModule
                )
            },
            {
              path: 'profile',
              loadChildren: () =>
                import('./components/profile/profile.module').then(
                  (m) => m.ProfileModule
                )
            }
          ]
        },
        {
          path: 'auth',
          canActivate: [authGuard],
          loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule)
        },
        { path: 'notfound', component: NotfoundComponent }
        // { path: '**', redirectTo: '/notfound' }
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload'
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
