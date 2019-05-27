import { Component, OnInit } from "@angular/core";
import Employee from "../Employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee-get",
  templateUrl: "./employee-get.component.html",
  styleUrls: ["./employee-get.component.css"]
})
export class EmployeeGetComponent implements OnInit {
  employees: Employee[];
  cargos: [];
  filter: string;
  constructor(private es: EmployeeService) {}
  length = 0;
  pageSize = 10;
  loading = true;
  filterEmployee() {
    const element = event.currentTarget as HTMLInputElement;
    const cargo = element.value;
    this.filter = cargo;
    this.loading = true;
    this.es.getEmployees(cargo).subscribe((data: any) => {
      this.employees = data.items;
      this.length = data.total;
      this.pageSize = data.size;
      this.loading = false;
    });
  }

  deleteEmployee(id) {
    this.es.deleteEmployee(id).subscribe(c=>this.getData());
  }

  getData() {
    this.loading = true;
    this.es.getEmployees().subscribe((data: any) => {
      this.employees = data.items;
      this.length = data.total;
      this.pageSize = data.size;
      this.loading = false;
    });
    this.es.getCargos().subscribe((data: any) => {
      this.cargos = data.items;
    });
  }
  changePage(event){
    this.loading = true;
    this.es.getEmployees(this.filter,event.pageIndex+1, event.pageSize).subscribe((data: any) => {
      this.employees = data.items;
      this.length = data.total;
      this.pageSize = data.size;
      this.loading = false;
    });
  }
  ngOnInit() {
    this.getData();
  }
}
