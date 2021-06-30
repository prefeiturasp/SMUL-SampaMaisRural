import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCounterComponent } from './category-counter.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CounterAnimationComponent } from '../counter-animation/counter-animation.component';

describe('CategoryCounterComponent', () => {
  let component: CategoryCounterComponent;
  let fixture: ComponentFixture<CategoryCounterComponent>;
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCounterComponent, CounterAnimationComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCounterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
