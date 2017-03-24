import { FilterPipe } from './filter.pipe';
import {filterTypes} from "../model";

describe('FilterPipe', () => {
  let pipe = new FilterPipe();
  let todos = null;
  beforeEach(() => {
    todos = [
      {text: 1, isCompleted: false},
      {text: 2, isCompleted: false},
      {text: 3, isCompleted: true},
      {text: 4, isCompleted: false},
    ]
  });

  it('should return all todos if filter type equal to All', () => {
    const filterTodos = pipe.transform(todos, filterTypes.all);
    expect(filterTodos).toEqual(todos);
  });

  it('should return active todos if filter type equal to Active', () => {
    const expected = [
      {text: 1, isCompleted: false},
      {text: 2, isCompleted: false},
      {text: 4, isCompleted: false},
    ];
    const filterTodos = pipe.transform(todos, filterTypes.active);
    expect(filterTodos).toEqual(expected);
  });

  it('should return completed todos if filter type equal to Completed', () => {
    const expected = [
      {text: 3, isCompleted: true},
    ];
    const filterTodos = pipe.transform(todos, filterTypes.completed);
    expect(filterTodos).toEqual(expected);
  });
});
