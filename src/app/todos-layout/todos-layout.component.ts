import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todos-layout',
  templateUrl: './todos-layout.component.html',
  styleUrls: ['./todos-layout.component.scss'],

})
export class TodosLayoutComponent implements OnInit {
  placeholder = 'What needs to be done?';
  todos: string[] = [];
  constructor() { }

  ngOnInit() {
  }

  empty() {
    return this.todos.length === 0;
  }
}
