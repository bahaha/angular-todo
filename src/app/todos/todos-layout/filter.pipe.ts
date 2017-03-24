import { Pipe, PipeTransform } from '@angular/core';
import {Todo, Filters, filterTypes} from "../model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Todo[], type?: Filters): any {
    switch (type) {
      case filterTypes.active:
        return value.filter(todo => !todo.isCompleted);
      case filterTypes.completed:
        return value.filter(todo => todo.isCompleted);
      default:
        return value;
    }
  }

}
