import { Component, inject, OnInit } from '@angular/core';
import { Department } from '../../../core/models/department.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { NgIf } from '@angular/common';
import { DepartementService } from '../../../core/services/department/departement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HeaderComponent, MatIconModule, NgIf],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
openAddEmployee() {
throw new Error('Method not implemented.');
}
  departments: Department[] = [];
  filteredDepartement: Department[] = [];
  searchForm: FormGroup;
  selectedDepartmentId: number | null = null;
  showConfirmDialog = false;
  departmentService = inject(DepartementService);
  fb = inject(FormBuilder);

  constructor() {
    this.searchForm = this.fb.group({
      keyword: ['']
    });  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });
  }

  confirmDelete(id: number) {
    this.selectedDepartmentId = id;
    this.showConfirmDialog = true;
  }

  cancelDelete() {
    this.selectedDepartmentId = null;
    this.showConfirmDialog = false;
  }

  deleteDepartment() {
    if (!this.selectedDepartmentId) return;

    this.departmentService.delete(this.selectedDepartmentId).subscribe(() => {
      this.departments = this.departments.filter(dep => dep.id !== this.selectedDepartmentId);
      this.cancelDelete();
    });
  }

  editDepartment(id: number) {
    alert(`Modifier département ID: ${id}`);
    // À remplacer par modal ou navigation vers un formulaire
  }

  filterEmployees() {
    const keyword = this.searchForm.get('keyword')?.value?.toLowerCase() || '';
    this.filteredDepartement = this.departments.filter(emp =>
      `${emp.name}`.toLowerCase().includes(keyword)
    );
  }
}
