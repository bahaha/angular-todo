import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosLayoutComponent } from './todos-layout.component';

describe('TodosLayoutComponent', () => {
  let component: TodosLayoutComponent;
  let fixture: ComponentFixture<TodosLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosLayoutComponent ]
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
    const inputBar = compiled.querySelector('header');
    const todoItems = compiled.querySelector('section');
    const functions = compiled.querySelector('footer');
    expect(inputBar).not.toBeNull();
    expect(todoItems).not.toBeNull();
    expect(functions).not.toBeNull();
  });
});
