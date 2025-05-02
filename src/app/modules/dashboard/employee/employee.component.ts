import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeComponent } from '../../../components/add-employe/add-employe.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, HeaderComponent],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchForm: FormGroup;
  employeeService = inject(EmployeeService);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  selectedEmployeeId: number | null = null;
  showConfirmEmployeeDialog = false;


  triggerDeleteEmployee(id: number) {
    this.selectedEmployeeId = id;
    this.showConfirmEmployeeDialog = true;
  }

  constructor() {
    this.searchForm = this.fb.group({
      keyword: [''],
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
    this.filteredEmployees = this.employees.filter((emp) =>
      `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(keyword)
    );
  }

  openAddEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeComponent, {
      width: '500px',
      data: { employee: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.employeeService.getAll().subscribe((data) => {
          this.employees = data;
          this.filterEmployees();
        });
      }
    });
  }

  editEmployee(id: number): void {
    const employee = this.employees.find((e) => e.id === id);
    if (!employee) return;

    const dialogRef = this.dialog.open(AddEmployeComponent, {
      width: '500px',
      data: { employee },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.employeeService.getAll().subscribe((data) => {
          this.employees = data;
          this.filterEmployees();
        });
      }
    });
  }

  deleteEmployee(id: number) {
    // Logic to confirmer suppression
    if (confirm('Voulez-vous vraiment supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe(() => {
        this.employees = this.employees.filter((e) => e.id !== id);
        this.filterEmployees();
      });
    }
  }

  cancelDeleteEmployee() {
    this.selectedEmployeeId = null;
    this.showConfirmEmployeeDialog = false;
  }

  confirmDeleteEmployee() {
    if (!this.selectedEmployeeId) return;

    this.employeeService.delete(this.selectedEmployeeId).subscribe(() => {
      this.employees = this.employees.filter(
        (e) => e.id !== this.selectedEmployeeId
      );
      this.filterEmployees();
      this.cancelDeleteEmployee();
    });
  }
}
