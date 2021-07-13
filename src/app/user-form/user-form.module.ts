import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';

import { UserFormRoutingModule } from './user-form-routing.module';

@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    UserFormRoutingModule
  ]
})
export class UserFormModule { }
