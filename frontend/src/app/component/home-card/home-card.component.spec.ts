import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardComponent } from './home-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('HomeCardComponent', () => {
  let component: HomeCardComponent;
  let fixture: ComponentFixture<HomeCardComponent>;

  const deviceServiceStub = {
    isMobile: function() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [{provide: DeviceDetectorService, useValue: deviceServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
