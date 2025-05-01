import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  private api = 'http://127.0.0.1:8000/api/departments';
  private http = inject(HttpClient);

  constructor() {}

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.api);
  }

  getById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.api}/${id}`);
  }

  create(department: { name: string }): Observable<Department> {
    return this.http.post<Department>(this.api, department);
  }

  update(id: number, department: { name: string }): Observable<Department> {
    return this.http.put<Department>(`${this.api}/${id}`, department);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
