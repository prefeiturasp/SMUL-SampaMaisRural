import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAgricultureComponent } from './category-agriculture.component';
import { CategoryCounterComponent } from '../category-counter/category-counter.component';
import { ChartPieComponent } from '../chart-pie/chart-pie.component';
import { CounterAnimationComponent } from '../counter-animation/counter-animation.component';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

describe('CategoryAgricultureComponent', () => {
  let component: CategoryAgricultureComponent;
  let fixture: ComponentFixture<CategoryAgricultureComponent>;
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}, createUrlTree: function(){}, serializeUrl : function(){} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAgricultureComponent, CategoryCounterComponent, ChartPieComponent, CounterAnimationComponent ],
      imports: [RouterModule.forRoot([]), ChartsModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAgricultureComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
