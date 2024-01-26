import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CoursesService } from './service/courses.service';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AuthService } from './service/auth.service';
import { AttendancesService } from './service/attendances.service';
import { DepartmentsService } from './service/departments.service';
import { GroupHomesService } from './service/group-homes.service';
import { GroupsService } from './service/groups.service';
import { HomeworksService } from './service/homeworks.service';
import { RoomsService } from './service/rooms.service';
import { StudentsService } from './service/students.service';
import { TopicsService } from './service/topics.service';
import { WorkersService } from './service/workers.service';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    },
    AuthService,
    AttendancesService,
    CoursesService,
    DepartmentsService,
    GroupHomesService,
    GroupsService,
    HomeworksService,
    RoomsService,
    StudentsService,
    TopicsService,
    WorkersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
