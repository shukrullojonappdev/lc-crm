import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { PrimeModule } from '../shared/prime.module';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ToastModule
  ],
  providers: [BreadcrumpService, MessageService]
})
export class EditModule {}
