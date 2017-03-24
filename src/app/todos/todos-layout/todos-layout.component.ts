import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Todo, Filters, filterTypes} from "../model";
import {FilterPipe} from "./filter.pipe";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'todos-layout',
  templateUrl: 'todos-layout.component.html',
  styleUrls: ['todos-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FilterPipe]
})
export class TodosLayoutComponent implements OnInit {
  placeholder = 'What needs to be done?';
  todos: Todo[] = [];
  private filterType: Filters;
  isAllChecked: boolean;

  constructor(private filterPipe: FilterPipe) { }

  ngOnInit() {
    this.isAllChecked = false;
  }

  empty() {
    return this.todos.length === 0;
  }

  addTodo(todo: string, id: number = Date.now()) {
    this.todos = [...this.todos, {
      id: id,
      text: todo,
      isCompleted: false,
    }];
  }

  private updateTodo(item: Todo, partial: any): Todo {
    return Object.assign({}, item, partial);
  }

  private isAllTodosChecked() {
    return !this.empty() && this.activeSize === 0;
  }

  toggleTodo(index: number) {
    const item = this.todos[index];
    this.todos = [...this.todos.slice(0, index),
      this.updateTodo(item, {isCompleted: !item.isCompleted}),
      ...this.todos.slice(index + 1)
    ];
    this.isAllChecked = this.isAllTodosChecked();
  }

  toggleAllTodos() {
    const isAllChecked = this.isAllTodosChecked();
    this.todos = this.todos.map(todo => this.updateTodo(todo, {isCompleted: !isAllChecked}));
    this.isAllChecked = !isAllChecked;
  }

  changeFilterType(type: Filters) {
    this.filterType = type;
  }

  clearCompleted() {
    this.todos = this.filterPipe.transform(this.todos, filterTypes.active);
  }

  get hasCompletedItem() {
    return this.filterPipe.transform(this.todos, filterTypes.completed).length > 0;
  }

  get activeSize() {
    return this.filterPipe.transform(this.todos, filterTypes.active).length;
  }

}
