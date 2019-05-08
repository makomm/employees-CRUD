import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeGetComponent } from './employee-get/employee-get.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
const routes: Routes = [
  {
    path: 'employee/create',
    component: EmployeeAddComponent
  }, {
    path: 'employee/edit/:id',
    component: EmployeeUpdateComponent
  }, {
    path: 'employee',
    component: EmployeeGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
