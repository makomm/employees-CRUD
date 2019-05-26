import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uri = 'http://localhost:3000/employee';
  apiKey = '46070D4BF934FB0D4B06D9E2C46E346944E322444900A435D7D9A95E6D7435F5';
  requestOptions =  {                                                                                                                                                                                 
    headers: new HttpHeaders({'Authorization':this.apiKey}), 
  };


  constructor(private http: HttpClient) { }

  createEmployee(nome, idade, cargo) {
    const body = {
      nome,
      idade,
      cargo
    };
    return this.http.post(this.uri, body, this.requestOptions);
      
  }

  updateEmployee(nome, idade, cargo,id) {
    const body = {
      nome,
      idade,
      cargo,
      id
    };
    return this.http.put(this.uri, body,this.requestOptions);
      
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
    
    return this.http.delete(`${this.uri}/${id}`,{...this.requestOptions,responseType:'text'});
  }
}
