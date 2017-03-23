import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputComponent } from './todo-input.component';
import {ReactiveFormsModule, FormControl} from "@angular/forms";

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TodoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
  });

  it('should contain an input with placeholder', () => {
    const placeholder = 'What needs to be done?';
    component.placeholder = placeholder;
    fixture.detectChanges();
    const label = fixture.debugElement.nativeElement.querySelector('label');
    const input = fixture.debugElement.nativeElement.querySelector('input#new_todo');

    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input.getAttribute('placeholder')).toBe(placeholder);
  });

  describe('should contain an icon in label', () => {
    it('should NOT have empty class if there are some todos', () => {
      component.emptyTodos = false;
      fixture.detectChanges();
      let label = fixture.debugElement.nativeElement.querySelector('label');
      expect(label.classList.contains('empty')).toBeFalsy();
    });
    it('should have empty class if no any todo items there', () => {
      component.emptyTodos = true;
      fixture.detectChanges();
      const label = fixture.debugElement.nativeElement.querySelector('label');
      expect(label.classList.contains('empty')).toBeTruthy();
    })
  });

  it('should create a required form control', () => {
    component.ngOnInit();
    expect(component.newTodo).toBeTruthy();
    component.newTodo.setValue('');
    expect(component.newTodo.valid).toBeFalsy();
  });

  it('should raise newTodo event when user add todo item', () => {
    const todo = 'Buy a unicorn.';
    const fc = new FormControl(todo);
    let newTodo = null;
    component.submitTodo.subscribe(todo => newTodo = todo);
    component.addTodo(fc);
    expect(newTodo).toBe(todo);
    expect(fc.value).toBeNull();
  });

  it('should trigger addTodo when user hits ENTER', () => {
    const spy = spyOn(component, 'addTodo');
    const todo = 'Taste JavaScript';
    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input#new_todo');
    input.value = todo;
    input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
    expect(spy).toHaveBeenCalledWith(component.newTodo);
  });
});
