import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "../employee.service";
// import Employee from '../Employee';
import { MatSnackBar } from "@angular/material";
import { fbind } from 'q';

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.css"]
})
export class EmployeeAddComponent implements OnInit {
  angForm: FormGroup;
  loading =  false;
  constructor(
    private fb: FormBuilder,
    private es: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      pessoa_nome: ["", Validators.required],
      pessoa_idade: ["", Validators.required],
      pessoa_cargo: ["", Validators.required]
    });
  }

  createEmployee(pessoa_nome, pessoa_idade, pessoa_cargo) {
    this.loading=true;
    this.es
      .createEmployee(pessoa_nome, pessoa_idade, pessoa_cargo)
      .subscribe(
        c => {
          this.loading=false;
          this.openSnackBar("Cadastrado", "Ok")
          this.angForm.reset();
        },
        err => {
          this.loading=false;
          this.openSnackBar(err.message, "Ok");
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  ngOnInit() {}
}
