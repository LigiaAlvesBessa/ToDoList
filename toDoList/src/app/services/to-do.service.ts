import { Injectable } from '@angular/core';
import { ToDo } from '../components/to-do/to-do.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private storageKey = 'todos';

  constructor() {}

  getTodos(): ToDo[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  saveTodos(todos: ToDo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
