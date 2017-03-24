import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import {Todo} from "../model";

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;

  });

  describe('should render', () => {
    const render = (todo: Todo) => {
      component.index = 0;
      component.text = todo.text;
      component.isCompleted = todo.isCompleted;
      fixture.detectChanges();

      return fixture.debugElement.nativeElement;
    };
    const assertElement = ({isCompleted}) => {
      const todo: Todo = {id: 0, text: 'Buy a unicorn', isCompleted};
      const compiled = render(todo);
      const text: HTMLLabelElement = compiled.querySelector('label');
      const checkbox: HTMLInputElement = compiled.querySelector('input');
      const item: HTMLDivElement = compiled.querySelector('div.item');

      expect(text.textContent).toBe(todo.text);
      expect(!!checkbox.getAttribute('checked')).toBe(isCompleted);
      expect(item.classList.contains('completed')).toBe(isCompleted);
    }

    it('the type and a unchecked checkbox if the todo item is NOT completed', () => {
      assertElement({isCompleted: false});
    });
    it('the type and a checked checkbox if the todo item is completed', () => {
      assertElement({isCompleted: true});
    });
  });

  it('should raise toggle event when user click the checkbox', () => {
    component.index = 0;
    let itemIndex = null;
    component.toggle.subscribe(idx => itemIndex = idx);

    component.toggleItemStatus(component.index);
    expect(itemIndex).toBe(component.index);
  });

  it('should raise remove event when removeItem', () => {
    component.index = 0;
    let itemIndex = null;
    component.remove.subscribe(idx => itemIndex = idx);
    component.removeItem(0);
    expect(itemIndex).toBe(0);
  });

  it('should trigger removeItem when user click on the remove button', () => {
    component.index = 0;
    const spy = spyOn(component, 'removeItem');
    fixture.detectChanges();
    const removeLink = fixture.nativeElement.querySelector('a.destroy');
    expect(removeLink).toBeTruthy();
    removeLink.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith(0);
  });

});
