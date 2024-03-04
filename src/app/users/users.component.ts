import { Component, computed, effect, input, signal } from '@angular/core';
import { ModifiedUser, User } from '../interfaces/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  template: `
    <input (input)="updateQuery($event)" placeholder="Start typing..." />
    <ul>
      @for (user of filteredUsers(); track user.id) {
      <li>{{ user.displayName }}</li>
      }
    </ul>
  `,
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userList = input.required({
    alias: 'users',
    transform: concatUserNames,
  });

  constructor() {
    effect(() => {
      console.log('New Input value is: ', this.userList());
    });
  }

  protected filteredUsers = computed(() =>
    this.userList().filter(({ displayName }) =>
      displayName.toLowerCase().startsWith(this.query())
    )
  );

  private query = signal('');

  updateQuery(e: Event) {
    this.query.set((e.target as HTMLInputElement).value.toLowerCase());
  }
}

function concatUserNames(users: User[]): ModifiedUser[] {
  return users.map(({ name, lastName, ...user }) => ({
    ...user,
    displayName: `${name} ${lastName}`,
  }));
}
