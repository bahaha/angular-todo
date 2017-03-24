import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLayoutComponent } from './todos-layout.component';
import {TodoInputComponent} from "../todo-input/todo-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {TodoFooterComponent} from "../todo-footer/todo-footer.component";
import {FilterLinkComponent} from "../filter-link/filter-link.component";
import {LinkComponent} from "../link/link.component";
import {FilterPipe} from "./filter.pipe";

describe('TodosLayoutComponent', () => {
  let component: TodosLayoutComponent;
  let fixture: ComponentFixture<TodosLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        TodosLayoutComponent,
        FilterPipe,
        TodoInputComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoFooterComponent,
        FilterLinkComponent,
        LinkComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosLayoutComponent);
    component = fixture.componentInstance;
  });

  describe('should render', () => {
    it('input bar, todo items', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const inputBar = compiled.querySelector('todo-input');
      const todoItems = compiled.querySelector('todo-list');
      expect(inputBar).not.toBeNull();
      expect(todoItems).not.toBeNull();
    });
    it('footer functions if there are some todos', () => {
      component.todos = [{text: '1', isCompleted: false}];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const functions = compiled.querySelector('todo-footer');
      expect(functions).not.toBeNull();
    });
    it('NO footer functions if there is no todo', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const functions = compiled.querySelector('todo-footer');
      expect(functions).toBeNull();
    });
  });

  describe('when invoking empty()', () => {
    it('should return true if there is no todo.', () => {
      expect(component.empty()).toBeTruthy();
    });
    it('should return false if there are some todos.', () => {
      component.todos = [{
        text: 'Buy a unicorn',
        isCompleted: false,
      }];
      expect(component.empty()).toBeFalsy();
    });
  });

  it('should add todo item to list when receive addTodo event', () => {
    const todo = 'Buy a unicorn';
    component.todos = [];
    expect(component.empty()).toBeTruthy();
    component.addTodo(todo);
    expect(component.todos).toContain({
      text: todo,
      isCompleted: false,
    });
    expect(component.empty()).toBeFalsy();
  });

  it('should toggle item completed state when receive toggleTodo event', () => {
    component.todos = [
      {text: '1', isCompleted: false},
      {text: '2', isCompleted: false},
      {text: '3', isCompleted: true},
      {text: '4', isCompleted: false},
    ];
    component.toggleTodo(0);
    expect(component.todos[0].isCompleted).toBeTruthy();

    component.toggleTodo(2);
    expect(component.todos[2].isCompleted).toBeFalsy();

    component.toggleTodo(3);
    expect(component.todos[3].isCompleted).toBeTruthy();
  });

  it('should remove completed items when receive a clear completed event', () => {
    const todos = [
      {text: '1', isCompleted: false},
      {text: '2', isCompleted: true},
    ];
    component.todos = todos;
    component.clearCompleted();
    expect(component.todos.length).toBe(1);
    expect(component.todos).toEqual([todos[0]]);
  });
});
