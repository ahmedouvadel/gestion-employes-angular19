import { Component, inject, OnInit } from '@angular/core';
import { Department } from '../../../core/models/department.model';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { DepartementService } from '../../../core/services/department/departement.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentModalComponent } from '../../../components/department-modal/department-modal.component';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, MatIconModule, NgIf],
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  filteredDepartement: Department[] = [];
  searchForm: FormGroup;
  selectedDepartmentId: number | null = null;
  showConfirmDialog = false;

  

  departmentService = inject(DepartementService);
  fb = inject(FormBuilder);
  dialog = inject(MatDialog);

  constructor() {
    this.searchForm = this.fb.group({ keyword: [''] });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
      this.filteredDepartement = [...data];
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
      this.filteredDepartement = [...this.departments];
      this.cancelDelete();
    });
  }

  filterEmployees() {
    const keyword = this.searchForm.get('keyword')?.value?.toLowerCase() || '';
    this.filteredDepartement = this.departments.filter(dep =>
      dep.name.toLowerCase().includes(keyword)
    );
  }

  openAddDepartment(department: Department | null = null) {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      width: '400px',
      data: { department },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') this.loadDepartments();
    });
  }

  editDepartment(dep: Department) {
    this.openAddDepartment(dep);
  }
}
