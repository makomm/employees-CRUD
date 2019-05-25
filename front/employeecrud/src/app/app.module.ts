import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeGetComponent } from './employee-get/employee-get.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    EmployeeUpdateComponent,
    EmployeeGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [ EmployeeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
