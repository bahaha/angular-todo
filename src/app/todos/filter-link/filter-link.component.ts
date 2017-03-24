import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import { Filters, filterTypes} from "../model";

@Component({
  selector: 'filter-link',
  templateUrl: 'filter-link.component.html',
  styleUrls: ['filter-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterLinkComponent implements OnInit {
  @Output() changeFilter: EventEmitter<Filters> = new EventEmitter();
  types: Filters[];
  private activeFilter: Filters;
  constructor() { }

  ngOnInit() {
    this.activeFilter = filterTypes.all;
    this.types = Object.keys(filterTypes)
                  .map(type => filterTypes[type]);
  }

  changeFilterType(type: Filters) {
    this.activeFilter = type;
    this.changeFilter.emit(type);
  }

  isActive(type: Filters) {
    return this.activeFilter === type;
  }
}
