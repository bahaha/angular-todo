import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
  });

  describe('when user click on link', () => {
    const type = 'Active';
    const assertEventHadBeenRaised = ({text, expected, isActive = false}) => {
      component.type = text;
      component.isActive = isActive;
      let filterType = null;
      component.changeFilterType.subscribe(type => filterType = type);
      component.onLinkClick();
      expect(filterType).toBe(expected);
    }
    it('should raise a changeFilterType event', () => {
      assertEventHadBeenRaised({text: type, expected: type});
    });
    it('should NOT raise a changeFilterType event if the link is active', () => {
      assertEventHadBeenRaised({text: type, expected: null, isActive: true});
    });
    it('should trigger changeFilterType', () => {
      const spy = spyOn(component.changeFilterType, 'emit');
      const link = fixture.nativeElement.querySelector('a');
      link.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    })
  });

  describe('link', () => {
    const assertElementClassList = ({isActive = false, hasActiveClass}) => {
      component.isActive = isActive;
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('a');
      expect(link.classList.contains('active')).toBe(hasActiveClass);
    };
    it('should have active class if the link is active', () => {
      assertElementClassList({isActive: true, hasActiveClass: true});
    });
    it('should NOT have active class if the link is active', () => {
      assertElementClassList({hasActiveClass: false});
    });
  });

});
