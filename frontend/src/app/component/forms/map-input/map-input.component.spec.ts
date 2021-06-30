import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInputComponent } from './map-input.component';

describe('MapInputComponent', () => {
  let component: MapInputComponent;
  let fixture: ComponentFixture<MapInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
