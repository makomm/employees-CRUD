import { Component, OnInit } from '@angular/core';
import Employee from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-get',
  templateUrl: './employee-get.component.html',
  styleUrls: ['./employee-get.component.css']
})
export class EmployeeGetComponent implements OnInit {

  employees: Employee[];
  cargos: [];
  constructor(private es: EmployeeService) { }

  filterEmployee() {
    const element = event.currentTarget as HTMLInputElement;
    const cargo = element.value;
    console.log('c', cargo);
    this.es.getEmployees(cargo).subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  ngOnInit() {
    this.es.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
    this.es.getCargos().subscribe((data: any ) => {
      this.cargos = data.items;
    });
  }

}
