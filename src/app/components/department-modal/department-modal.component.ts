// ✅ ETAPE 1 : Crée un composant standalone pour le formulaire modal
// department-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DepartementService } from '../../core/services/department/departement.service';
import { Department } from '../../core/models/department.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-department-modal',
  imports: [ReactiveFormsModule, CommonModule,
    MatDialogModule],
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.css'],
})
export class DepartmentModalComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartementService,
    private dialogRef: MatDialogRef<DepartmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { department: Department | null }
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data.department;
    this.form = this.fb.group({
      name: [this.data.department?.name || '', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const payload = this.form.value;

    if (this.isEdit && this.data.department) {
      this.departmentService.update(this.data.department.id, payload).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    } else {
      this.departmentService.create(payload).subscribe(() => {
        this.dialogRef.close('refresh');
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
