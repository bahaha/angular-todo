import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodosLayoutComponent } from './todos/todos-layout/todos-layout.component';
import { TodoInputComponent } from './todos/todo-input/todo-input.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';
import { TodoFooterComponent } from './todos/todo-footer/todo-footer.component';
import { FilterLinkComponent } from './todos/filter-link/filter-link.component';
import { LinkComponent } from './todos/link/link.component';
import { FilterPipe } from './todos/todos-layout/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TodosLayoutComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFooterComponent,
    FilterLinkComponent,
    LinkComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
