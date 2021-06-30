import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterAnimationComponent } from './counter-animation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CounterAnimationComponent', () => {
  let component: CounterAnimationComponent;
  let fixture: ComponentFixture<CounterAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterAnimationComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
