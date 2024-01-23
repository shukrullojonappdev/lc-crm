import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentInfoRoutingModule } from './student-info-routing.module';
import { StudentInfoComponent } from './student-info.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';

@NgModule({
  declarations: [StudentInfoComponent],
  imports: [CommonModule, StudentInfoRoutingModule, PrimeModule],
  providers: [BreadcrumpService]
})
export class StudentInfoModule {}
