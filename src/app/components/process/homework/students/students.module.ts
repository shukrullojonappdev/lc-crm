import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, StudentsRoutingModule, PrimeModule],
  providers: [BreadcrumpService]
})
export class StudentsModule {}
