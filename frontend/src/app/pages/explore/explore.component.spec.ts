import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreComponent } from './explore.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaceService } from 'src/app/services/place.service';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;
  const deviceServiceStub = {
    isMobile: function() {}
  }
  const routeSpy = { snapshot: { queryParams: {} } };
  const routerSpy = {events: {subscribe: function(){}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ BrowserAnimationsModule, FlexLayoutModule ],
      providers: [
        {provide: DeviceDetectorService, useValue: deviceServiceStub},
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: PlaceService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
