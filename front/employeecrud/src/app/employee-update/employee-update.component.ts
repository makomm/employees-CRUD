import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeeService } from "../employee.service";
// import Employee from '../Employee';
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-employee-update",
  templateUrl: "./employee-update.component.html",
  styleUrls: ["./employee-update.component.css"]
})
export class EmployeeUpdateComponent implements OnInit {
  angForm: FormGroup;
  id: Number;
  constructor(
    private fb: FormBuilder,
    private es: EmployeeService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.createForm();

    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.es.getEmployee(params["id"]).subscribe((c: any) => {
        this.angForm = this.fb.group({
          pessoa_nome: [c.items[0].nome, Validators.required],
          pessoa_idade: [c.items[0].idade, Validators.required],
          pessoa_cargo: [c.items[0].cargo, Validators.required]
        });
      });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      pessoa_nome: ["", Validators.required],
      pessoa_idade: ["", Validators.required],
      pessoa_cargo: ["", Validators.required]
    });
  }

  updateEmployee(pessoa_nome, pessoa_idade, pessoa_cargo) {
    this.es.updateEmployee(pessoa_nome, pessoa_idade, pessoa_cargo, this.id).subscribe(
      c => {
        this.openSnackBar("Atualizado", "Ok");
        this.angForm.reset();
      },
      err => this.openSnackBar(err.message, "Ok")
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  ngOnInit() {}
}
