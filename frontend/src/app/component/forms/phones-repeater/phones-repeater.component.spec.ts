import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesRepeaterComponent } from './phones-repeater.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PhonesRepeaterComponent', () => {
  let component: PhonesRepeaterComponent;
  let fixture: ComponentFixture<PhonesRepeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonesRepeaterComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonesRepeaterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
