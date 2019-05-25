import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) { }

  createEmployee(nome, idade, cargo) {
    const body = {
      nome,
      idade,
      cargo
    };
    return this.http.post(this.uri, body);
      
  }

  updateEmployee(nome, idade, cargo,id) {
    const body = {
      nome,
      idade,
      cargo,
      id
    };
    return this.http.put(this.uri, body);
      
  }

  getEmployees(cargo = null) {
    const params = cargo ? `?cargo=${cargo}` : '';
    return this.http.get(`${this.uri}${params}`);
  }

  getEmployee(id=null){
    return this.http.get(`${this.uri}?id=${id}`);
  }

  getCargos() {
    return this.http.get(`${this.uri}/cargos`);
  }

  deleteEmployee(id = null) {
    return this.http.delete(`${this.uri}/${id}`,{responseType:'text'});
  }
}
