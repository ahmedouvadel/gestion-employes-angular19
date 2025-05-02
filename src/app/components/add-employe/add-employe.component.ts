import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { CommonModule } from '@angular/common';
import { Employee } from '../../core/models/employee.model';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  imports: [ReactiveFormsModule,
    CommonModule,
    MatDialogModule,],
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  dialogRef=inject(MatDialogRef<AddEmployeComponent>) ;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee | null }
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data?.employee;

    this.form = this.fb.group({
      first_name: [this.data?.employee?.first_name || '', Validators.required],
      last_name: [this.data?.employee?.last_name || '', Validators.required],
      email: [this.data?.employee?.email || '', [Validators.required, Validators.email]],
      department_id: [this.data?.employee?.department_id || '', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.isEdit && this.data.employee) {
      this.employeeService.update(this.data.employee.id, payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: (err) => console.error('Erreur modification employé', err)
      });
    } else {
      this.employeeService.create(payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: (err) => console.error("Erreur ajout employé", err)
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
