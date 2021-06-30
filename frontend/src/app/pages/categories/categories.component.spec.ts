import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryCounterComponent } from 'src/app/component/category-counter/category-counter.component';
import { CounterAnimationComponent } from 'src/app/component/counter-animation/counter-animation.component';
import { CategoryAgricultureComponent } from 'src/app/component/category-agriculture/category-agriculture.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CategoriesComponent,
        CategoryCounterComponent, 
        CounterAnimationComponent,
        CategoryAgricultureComponent ],
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
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
