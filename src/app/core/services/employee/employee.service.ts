import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private api = 'http://127.0.0.1:8000/api/employees';
  http=inject(HttpClient)

  constructor() {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.api);
  }

  create(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.api, data);
  }

  update(id: number, data: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
