import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {TodosLayoutComponent} from "./todos/todos-layout/todos-layout.component";
import {TodoInputComponent} from "./todos/todo-input/todo-input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TodoListComponent} from "./todos/todo-list/todo-list.component";
import {TodoItemComponent} from "./todos/todo-item/todo-item.component";
import {TodoFooterComponent} from "./todos/todo-footer/todo-footer.component";
import {FilterLinkComponent} from "./todos/filter-link/filter-link.component";
import {LinkComponent} from "./todos/link/link.component";
import {FilterPipe} from "./todos/todos-layout/filter.pipe";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        AppComponent,
        HeaderComponent,
        TodosLayoutComponent,
        FilterPipe,
        TodoInputComponent,
        TodoListComponent,
        TodoItemComponent,
        TodoFooterComponent,
        FilterLinkComponent,
        LinkComponent,
        FooterComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
