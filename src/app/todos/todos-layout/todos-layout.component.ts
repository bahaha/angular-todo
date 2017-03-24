import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Todo, Filters, filterTypes} from "../model";
import {FilterPipe} from "./filter.pipe";

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

  constructor(private filterPipe: FilterPipe) { }

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
