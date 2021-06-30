import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesComponent } from './places.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaceService } from '../../services/place.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('PlacesComponent', () => {
  let component: PlacesComponent;
  let fixture: ComponentFixture<PlacesComponent>;
  const placesServiceStub = {
    getPlaces: function() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesComponent ],
      imports: [ RouterModule.forRoot([]), FlexLayoutModule, BrowserAnimationsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: PlaceService, useValue: placesServiceStub },
        { provide: DeviceDetectorService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
