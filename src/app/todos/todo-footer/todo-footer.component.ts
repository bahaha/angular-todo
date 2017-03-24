import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {Filters} from "../model";

@Component({
  selector: 'todo-footer',
  templateUrl: 'todo-footer.component.html',
  styleUrls: ['todo-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFooterComponent {
  @Input() size: number;
  @Input() hasCompletedItem: boolean;
  @Output() clearCompleted: EventEmitter<any> = new EventEmitter();
  @Output() changeFilterType: EventEmitter<Filters> = new EventEmitter();

  onClearCompleted() {
    this.clearCompleted.emit();
  }
}
