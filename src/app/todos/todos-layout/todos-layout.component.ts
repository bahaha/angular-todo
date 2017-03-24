import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Todo} from "../model";

@Component({
  selector: 'todos-layout',
  templateUrl: 'todos-layout.component.html',
  styleUrls: ['todos-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosLayoutComponent implements OnInit {
  placeholder = 'What needs to be done?';
  todos: Todo[] = [];
  constructor() { }

  ngOnInit() {
  }

  empty() {
    return this.todos.length === 0;
  }

  addTodo(todo: string) {
    this.todos = [...this.todos, {
      text: todo,
      isCompleted: false,
    }];
  }

  toggleTodo(index: number) {
    const item = this.todos[index];
    this.todos = [...this.todos.slice(0, index),
      Object.assign({}, item, {isCompleted: !item.isCompleted}),
      ...this.todos.slice(index + 1)
    ];
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.isCompleted);
  }

  get hasCompletedItem() {
    return this.todos.filter(todo => todo.isCompleted).length > 0;
  }

  get size() {
    return this.todos.length;
  }

}
