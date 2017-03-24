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
import {Subscription} from "rxjs";
import createSpyObj = jasmine.createSpyObj;

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
      component.todos = [{id: 0, text: '1', isCompleted: false}];
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
        id: 0,
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
    component.addTodo(todo, 0);
    expect(component.todos).toContain({
      id: 0,
      text: todo,
      isCompleted: false,
    });
    expect(component.empty()).toBeFalsy();
  });

  it('should toggle item completed state when receive toggleTodo event', () => {
    component.todos = [
      {id: 0, text: '1', isCompleted: false},
      {id: 1, text: '2', isCompleted: false},
      {id: 2, text: '3', isCompleted: true},
      {id: 3, text: '4', isCompleted: false},
    ];
    component.isAllChecked = createSpyObj('isAllChecked', ['next']);

    component.toggleTodo(0);
    expect(component.todos[0].isCompleted).toBeTruthy();

    component.toggleTodo(2);
    expect(component.todos[2].isCompleted).toBeFalsy();

    component.toggleTodo(3);
    expect(component.todos[3].isCompleted).toBeTruthy();
  });

  it('should remove a item when removeTodo with index', () => {
    const todos = [
      {id: 0, text: '1', isCompleted: false},
      {id: 1, text: '2', isCompleted: true},
    ];
    component.todos = todos;
    component.removeTodo(0);
    expect(component.todos).toEqual([todos[1]]);
  });
  it('should trigger removeTodo when receive a removeTodo event from todo-item', () => {
    const todos = [
      {id: 0, text: '1', isCompleted: false},
      {id: 1, text: '2', isCompleted: true},
    ];
    component.todos = todos;
    const spy = spyOn(component, 'removeTodo');
    fixture.detectChanges();
    const removeLinks = fixture.nativeElement.querySelectorAll('todo-item a.destroy');
    removeLinks[1].dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should remove completed items when receive a clear completed event', () => {
    const todos = [
      {id: 0, text: '1', isCompleted: false},
      {id: 1, text: '2', isCompleted: true},
    ];
    component.todos = todos;
    component.clearCompleted();
    expect(component.todos.length).toBe(1);
    expect(component.todos).toEqual([todos[0]]);
  });

  describe('toggle all todos', () => {
    let sub: Subscription = null;
    const assertItemsAndCheckedFlag = ({
      todos,
      expected,
      expectedCheckedFlag
    }) => {
      component.todos = todos;
      component.ngOnInit();

      component.toggleAllTodos();
      expect(component.todos).toEqual(expected);
      expect(component.isAllChecked).toBe(expectedCheckedFlag);
    };
    it('should activate all todos when all todos is completed', () => {
      const todos = [
        {id: 0, text: '1', isCompleted: true},
        {id: 1, text: '2', isCompleted: true},
      ];
      const allActiveTodoItem = todos.map(todo => Object.assign({}, todo, {isCompleted: false}));
      assertItemsAndCheckedFlag({
        todos,
        expected: allActiveTodoItem,
        expectedCheckedFlag: false
      });
    });
    it('should complete all todos where some todos are not completed', () => {
      const todos = [
        {id: 0, text: '1', isCompleted: true},
        {id: 1, text: '2', isCompleted: false},
        {id: 2, text: '3', isCompleted: false},
      ];
      const allActiveTodoItem = todos.map(todo => Object.assign({}, todo, {isCompleted: true}));
      assertItemsAndCheckedFlag({
        todos,
        expected: allActiveTodoItem,
        expectedCheckedFlag: true
      });
    });
    it('should complete all todos where ALL the todos are not completed', () => {
      const todos = [
        {id: 0, text: '1', isCompleted: false},
        {id: 1, text: '2', isCompleted: false},
        {id: 2, text: '3', isCompleted: false},
      ];
      const allActiveTodoItem = todos.map(todo => Object.assign({}, todo, {isCompleted: true}));
      assertItemsAndCheckedFlag({
        todos,
        expected: allActiveTodoItem,
        expectedCheckedFlag: true
      });
    });
  });
});
