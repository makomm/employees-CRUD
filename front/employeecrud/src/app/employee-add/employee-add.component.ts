import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import Employee from '../Employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private es: EmployeeService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      pessoa_nome: ['', Validators.required ],
      pessoa_idade: ['', Validators.required ],
      pessoa_cargo: ['', Validators.required ]
    });
  }

  createEmployee(pessoa_nome, pessoa_idade, pessoa_cargo) {
    this.es.createEmployee(pessoa_nome, pessoa_idade, pessoa_cargo);
  }

  ngOnInit() {
  }

}
