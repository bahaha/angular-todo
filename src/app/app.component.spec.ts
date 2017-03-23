import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {TodosLayoutComponent} from "./todos/todos-layout/todos-layout.component";
import {TodoInputComponent} from "./todos/todo-input/todo-input.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        AppComponent,
        HeaderComponent,
        TodosLayoutComponent,
        TodoInputComponent,
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
