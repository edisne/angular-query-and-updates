import { Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'todo',
    component: TodosComponent,
  },
];
