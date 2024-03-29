import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
