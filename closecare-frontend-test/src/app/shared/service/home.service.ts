import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl = 'http://localhost:5000'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  buildOptions(parameters?: {}, contentType: string = 'application/json', responseType: string = 'json') {
    let response = {};
    let headers = {};

    headers = new HttpHeaders({
      'Content-Type': contentType
    })
    
    response = {
      headers: headers,
      params: new HttpParams({
        fromObject: parameters
      }),
      responseType: responseType
    }        

    return response
  }

  constructor(
    private http: HttpClient
  ) { }

  getEmployee(parameters?: {}): Observable<Employee> {   
    return this.http
      .get<Employee>(`${this.apiUrl}/api/v1/employee/${parameters}`, this.buildOptions())
      .pipe(retry(1))
  }

  postEmployee(employee: Employee) {
    return this.http
      .post<Employee>(`${this.apiUrl}/api/v1/employee`, employee, this.buildOptions())
      .pipe(retry(1))
  }

}
