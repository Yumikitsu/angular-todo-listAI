import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/todo`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo = { title, completed: false };
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }
}
