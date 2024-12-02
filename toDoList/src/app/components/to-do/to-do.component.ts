import { Component, OnInit } from '@angular/core';
import { ToDo } from './to-do.model';
import { ToDoService } from '../../services/to-do.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {

  todos: ToDo[] = [];
  newTask: string = '';
  editMode: boolean = false;
  taskToEdit: ToDo | null = null;

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.todos = this.toDoService.getTodos();
  }

  addTask(): void {
    if (!this.newTask.trim()) return;
    const newTodo: ToDo = {
      id: Date.now(),
      title: this.newTask,
      completed: false,
    };
    this.todos.push(newTodo);
    this.toDoService.saveTodos(this.todos);
    this.newTask = '';
  }

  editTask(todo: ToDo): void {
    this.taskToEdit = { ...todo };
  }

  saveEdit(): void {
    if (this.taskToEdit) {
      const index = this.todos.findIndex((t) => t.id === this.taskToEdit!.id);
      if (index !== -1) {
        this.todos[index] = this.taskToEdit;
        this.toDoService.saveTodos(this.todos);
      }
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.taskToEdit = null;
  }


  deleteTask(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.toDoService.saveTodos(this.todos);
  }

  toggleComplete(todo: ToDo): void {
    todo.completed = !todo.completed;
    this.toDoService.saveTodos(this.todos);
  }

}
