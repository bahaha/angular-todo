import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLinkComponent } from './filter-link.component';
import {LinkComponent} from "../link/link.component";
import {filterTypes} from "../model";

describe('FilterLinkComponent', () => {
  let component: FilterLinkComponent;
  let fixture: ComponentFixture<FilterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterLinkComponent, LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLinkComponent);
    component = fixture.componentInstance;

  });

  it('should render all filter types with Link component', () => {
    fixture.detectChanges();
    const links = Array.from(fixture.nativeElement.querySelectorAll('type-link'))
      .map((dom: HTMLElement) => dom.querySelector('a').textContent.trim());
    const filters = Object.keys(filterTypes).map(type => filterTypes[type]);
    expect(links).toEqual(filters);
  });

  it('should change active filter type when receive a changeFilterType event', () => {
    component.changeFilterType(filterTypes.active);
    expect(component.isActive(filterTypes.all)).toBeFalsy();
    expect(component.isActive(filterTypes.active)).toBeTruthy();
    expect(component.isActive(filterTypes.completed)).toBeFalsy();
  });

  it('should raise a change filter event when filter type changed', () => {
    const spy = spyOn(component.changeFilter, 'emit');
    component.changeFilterType(filterTypes.active);
    expect(spy).toHaveBeenCalledWith(filterTypes.active);
  });

  it('should be all as default filter type', () => {
    component.ngOnInit();
    expect(component.isActive(filterTypes.all)).toBeTruthy();
  });
});
