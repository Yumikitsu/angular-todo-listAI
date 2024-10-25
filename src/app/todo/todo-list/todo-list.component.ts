import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> = of([]);
  showCompleted = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todos$ = this.todoService.getTodos().pipe(
      map(todos => todos.filter(todo => this.showCompleted || !todo.completed))
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => this.fetchTodos());
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => this.fetchTodos());
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    this.fetchTodos();
  }
}
