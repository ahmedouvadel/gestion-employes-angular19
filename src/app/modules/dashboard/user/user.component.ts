import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../components/header/header.component';
import { NgIf } from '@angular/common';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatIconModule, NgIf],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUserId: number | null = null;
  showConfirmDialog = false;
  userService = inject(UserService); 

  constructor() {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  confirmDelete(userId: number) {
    this.selectedUserId = userId;
    this.showConfirmDialog = true;
  }

  cancelDelete() {
    this.selectedUserId = null;
    this.showConfirmDialog = false;
  }

  deleteUser() {
    if (!this.selectedUserId) return;
    this.userService.deleteUser(this.selectedUserId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== this.selectedUserId);
      this.cancelDelete();
    });
  }
}
