import {Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'todo-input',
  templateUrl: 'todo-input.component.html',
  styleUrls: ['todo-input.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent implements OnInit{
  @Input() isEmpty: boolean;
  @Input() isAllChecked: boolean;
  @Input() placeholder: string;
  @Output() submitTodo: EventEmitter<string> = new EventEmitter();
  @Output() toggleAllTodos: EventEmitter<boolean> = new EventEmitter();

  newTodo: FormControl;
  constructor(private formBuilder: FormBuilder) { }

  addTodo(todo: FormControl) {
    if(todo.invalid) return;
    this.submitTodo.emit(todo.value);
    todo.setValue(null);
  }

  toggleAll() {
    if(this.isEmpty) return;
    this.toggleAllTodos.emit(true);
  }

  ngOnInit() {
    this.newTodo = this.formBuilder.control(null, Validators.required);
  }
}
