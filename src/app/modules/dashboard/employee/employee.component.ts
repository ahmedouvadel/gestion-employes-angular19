import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, HeaderComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchForm: FormGroup;
  employeeService= inject(EmployeeService);
  fb= inject(FormBuilder);

  constructor() {
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = [...data];
    });
  }

  filterEmployees() {
    const keyword = this.searchForm.get('keyword')?.value?.toLowerCase() || '';
    this.filteredEmployees = this.employees.filter(emp =>
      `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(keyword)
    );
  }

  openAddEmployee() {
    // Logic to open modal/form
    alert('Ouvrir formulaire ajout employé');
  }

  editEmployee(id: number) {
    // Logic to navigate or open modal
    alert(`Modifier employé ${id}`);
  }

  deleteEmployee(id: number) {
    // Logic to confirmer suppression
    if (confirm('Voulez-vous vraiment supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe(() => {
        this.employees = this.employees.filter(e => e.id !== id);
        this.filterEmployees();
      });
    }
  }
}
