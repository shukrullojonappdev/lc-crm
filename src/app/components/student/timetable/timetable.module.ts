import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [TimetableComponent],
  imports: [CommonModule, TimetableRoutingModule, FullCalendarModule]
})
export class TimetableModule {}
