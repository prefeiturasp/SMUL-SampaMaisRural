import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  const routeSpy: any = {snapshot: {}};
  const routerSpy = {};
  const placeServiceStub = {
    currentType: {subscribe: function(){}}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        RouterModule.forRoot([]),
        FlexLayoutModule 
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: Router, useValue: routerSpy },
        { provide: PlaceService, useValue: placeServiceStub },
        { provide: DeviceDetectorService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
