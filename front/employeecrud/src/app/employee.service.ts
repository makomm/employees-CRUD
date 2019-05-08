import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://localhost:4200/employee';
  constructor(private http: HttpClient) { }

  createEmployee(nome, idade, cargo) {
    const body = {
      nome,
      idade,
      cargo
    };
    this.http.post(this.uri, body)
      .subscribe(res => console.log('Cadastrado!'));
  }
  getEmployees(cargo = null) {
    const params = cargo ? `?cargo=${cargo}` : '';
    return this.http.get(`${this.uri}${params}`);
  }

  getCargos() {
    return this.http.get(`${this.uri}/cargos`);
  }
}
