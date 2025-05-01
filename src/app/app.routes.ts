import { Routes } from '@angular/router';
import { SidebarComponent } from './modules/dashboard/sidebar/sidebar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./modules/auth/signup/signup.component').then((m) => m.SignupComponent),
  },

  {
    path: 'home',
    component: SidebarComponent,
    children: [
      {
        path: '',
        redirectTo: 'departments',
        pathMatch: 'full',
      },
      {
        path: 'departments',
        loadComponent: () =>
          import('./modules/dashboard/department/department.component').then(
            (m) => m.DepartmentComponent
          ),
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./modules/dashboard/employee/employee.component').then(
            (m) => m.EmployeeComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./modules/dashboard/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
    ],
  },
];
