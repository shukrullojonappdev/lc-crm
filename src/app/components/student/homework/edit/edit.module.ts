import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BreadcrumpService]
})
export class EditModule {}
