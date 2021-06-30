import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('HeaderComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DeviceDetectorService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
