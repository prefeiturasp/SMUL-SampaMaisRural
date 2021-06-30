import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { PlaceShowComponent } from './place-show.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';

describe('PlaceShowComponent', () => {
  let component: PlaceShowComponent;
  let fixture: ComponentFixture<PlaceShowComponent>;
  const routeSpy = { snapshot: { queryParams: {} }, paramMap: {subscribe: function(){ return []}} };
  const routerSpy = {events: {subscribe: function(){}}};
  const placeServiceStub = {
    currentType: {subscribe: function(){}}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceShowComponent ],
      imports: [ FlexLayoutModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Location },
        { provide: PlaceService, useValue: placeServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
