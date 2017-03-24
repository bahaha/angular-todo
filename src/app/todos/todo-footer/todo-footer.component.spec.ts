import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFooterComponent } from './todo-footer.component';
import {FilterLinkComponent} from "../filter-link/filter-link.component";
import {LinkComponent} from "../link/link.component";

describe('TodoFooterComponent', () => {
  let component: TodoFooterComponent;
  let fixture: ComponentFixture<TodoFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoFooterComponent,
        FilterLinkComponent,
        LinkComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFooterComponent);
    component = fixture.componentInstance;
  });

  it('should render how many items left on the todo list', () => {
    component.size = 10;
    fixture.detectChanges();

    const leftLabel = fixture.nativeElement.querySelector('div.item_left');
    expect(leftLabel.textContent).toContain('10');
  });

  describe('should render clear completed with', () => {
    const assertElementHasHiddenClass = ({hasCompletedItem, isHidden}) => {
      component.hasCompletedItem = hasCompletedItem;
      fixture.detectChanges();
      const rightItem = fixture.nativeElement.querySelector('a.clear_complete');
      expect(rightItem.classList.contains('hidden')).toBe(isHidden);
    };
    it('no any completed item', () => {
      assertElementHasHiddenClass({
        hasCompletedItem: false,
        isHidden: true,
      });
    });
    it('some completed items', () => {
      assertElementHasHiddenClass({
        hasCompletedItem: true,
        isHidden: false,
      });
    });
  })

  it('should raise an clearCompleted event when clear completed', () => {
    let hasBeenRaised = false;
    component.clearCompleted.subscribe(() => hasBeenRaised = true);

    component.onClearCompleted();
    expect(hasBeenRaised).toBeTruthy();
  });
  it('should trigger onClearCompleted when user click on Clear completed link', () => {
    component.hasCompletedItem = true;
    const spy = spyOn(component.clearCompleted, 'emit');
    const link = fixture.nativeElement.querySelector('a.clear_complete');
    link.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
