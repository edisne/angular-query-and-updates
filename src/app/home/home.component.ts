import { Component } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent],
  template: ` <section class="header">
      <button (click)="addUser()">Add Alan</button>
    </section>
    <app-users [users]="users" />`,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  users: User[] = [
    { id: 1, name: 'Adam', lastName: 'Malish', username: 'adam.malish' },
    { id: 2, name: 'Peter', lastName: 'Porker', username: 'peter.porker' },
    { id: 3, name: 'Joe', lastName: 'Doe', username: 'joe.doe' },
    { id: 4, name: 'Jane', lastName: 'Dea', username: 'jane.dea' },
  ];

  addUser() {
    this.users = [
      {
        id: 5,
        name: 'Alan',
        lastName: 'Walker',
        username: 'alan.walker',
      },
      ...this.users,
    ];
    console.log('Current Users', this.users);
  }
}
