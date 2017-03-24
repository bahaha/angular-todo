import {Component, Input, ChangeDetectionStrategy, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() index: number;
  @Input() text: string;
  @Input() isCompleted: boolean;
  @Output() toggle: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  toggleItemStatus(index) {
    this.toggle.emit(index);
  }

  removeItem(index) {
    this.remove.emit(index);
  }
}
