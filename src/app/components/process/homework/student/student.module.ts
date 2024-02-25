import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { PrimeModule } from '../../shared/prime.module';
import { BreadcrumpService } from '../../shared/breadcrump.service';

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule, PrimeModule],
  providers: [BreadcrumpService]
})
export class StudentModule {}
