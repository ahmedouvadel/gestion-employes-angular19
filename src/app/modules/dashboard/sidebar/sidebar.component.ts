import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems = [
    { label: 'Départements', icon: 'business', route: '/home/departments' },
    { label: 'Employés', icon: 'groups', route: '/home/employees' },
    { label: 'Utilisateurs', icon: 'person', route: '/home/users' },
  ];
}
