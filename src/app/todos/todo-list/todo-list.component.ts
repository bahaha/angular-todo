import {Component, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {Todo} from "../model";

@Component({
  selector: 'todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Output() toggle: EventEmitter<number> = new EventEmitter();
  @Output() removeTodo: EventEmitter<number> = new EventEmitter();
  byId = (index:number, item: Todo) => item.id;
}
