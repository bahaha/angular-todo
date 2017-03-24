import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import {TodoItemComponent} from "../todo-item/todo-item.component";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodoItemComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

  });

  it('should render todo items from todos array', () => {
    const item1 = 'Vanilla Js';
    const item2 = 'Buy a unicorn';
    component.todos = [item1, item2].map((text: string, id: number) => ({id, text, isCompleted: false}));
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const items = compiled.querySelectorAll('todo-item');

    expect(items.length).toBe(2);
  });
});
