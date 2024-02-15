import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    eventClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
}
