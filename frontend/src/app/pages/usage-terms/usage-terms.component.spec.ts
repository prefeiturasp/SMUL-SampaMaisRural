import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageTermsComponent } from './usage-terms.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsageTermsComponent', () => {
  let component: UsageTermsComponent;
  let fixture: ComponentFixture<UsageTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageTermsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
