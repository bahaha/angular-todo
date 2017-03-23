import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLayoutComponent } from './todos-layout.component';
import {TodoInputComponent} from "../todo-input/todo-input.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('TodosLayoutComponent', () => {
  let component: TodosLayoutComponent;
  let fixture: ComponentFixture<TodosLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        TodosLayoutComponent,
        TodoInputComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should contains input bar, todo items and functions', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const inputBar = compiled.querySelector('todo-input');
    const todoItems = compiled.querySelector('section');
    const functions = compiled.querySelector('footer');
    expect(inputBar).not.toBeNull();
    expect(todoItems).not.toBeNull();
    expect(functions).not.toBeNull();
  });

  describe('when invoking empty()', () => {
    it('should return true if there is no todo.', () => {
      expect(component.empty()).toBeTruthy();
    });
    it('should return false if there are some todos.', () => {
      component.todos = ['Buy a unicorn'];
      expect(component.empty()).toBeFalsy();
    });
  });

  it('should add todo item to list when receive addTodo event', () => {
    const todo = 'Buy a unicorn';
    component.todos = [];
    expect(component.empty()).toBeTruthy();
    component.addTodo(todo);
    expect(component.todos).toContain(todo);
    expect(component.empty()).toBeFalsy();
  });
});
