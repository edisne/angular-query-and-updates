import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TodoService } from '../services/todo.service';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { Todo } from '../interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  search = signal(localStorage.getItem('searchString') || '');
  search$ = toObservable(this.search);
  todos = signal<Todo[]>([]);
  todoService = inject(TodoService);
  queryClient = injectQueryClient();

  ngOnInit(): void {
    this.todoService.getTodos().subscribe({
      next: (todos: Todo[]) => this.todos.set(todos),
    });
  }

  filteredTodos = computed(() =>
    this.todos().filter(({ title }) =>
      title.toLowerCase().startsWith(this.search())
    )
  );

  logger = effect(() => {
    localStorage.setItem('searchString', this.search());
  });

  setSearchString(e: Event) {
    this.search.set((e.target as HTMLInputElement).value.toLowerCase());
    // this.filteredTodos$ = this.query
    //   .data()
    //   ?.pipe(
    //     map((todos) =>
    //       todos.filter(({ title }) =>
    //         title.toLowerCase().startsWith(this.search())
    //       )
    //     )
    //   );
  }
  onAddTodo() {
    this.todos.update((todos) => [
      ...todos,
      { title: 'Do Laundry', id: Date.now().toString() },
    ]);
    // this.mutation.mutate({ title: 'Do Laundry', id: Date.now().toString() });
    // this.filteredTodos$ = this.filteredTodos$?.pipe(
    //   map((todos) =>
    //     todos.concat({ title: 'Do Laundry', id: Date.now().toString() })
    //   )
    // );
  }

  query = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getTodos(),
  }));

  // filteredTodos$: Observable<Todo[]> | undefined = this.todoService.getTodos();

  // mutation = injectMutation((client) => ({
  //   mutationFn: (todo: Todo) => firstValueFrom(this.todoService.addTodo(todo)),
  //   onSuccess: () => {
  //     client.invalidateQueries({ queryKey: ['todos'] });
  //   },
  // }));
}
