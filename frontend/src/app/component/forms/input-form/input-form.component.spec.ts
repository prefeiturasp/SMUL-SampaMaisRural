import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';
import { PhonesRepeaterComponent } from '../phones-repeater/phones-repeater.component';
import { RadioInputComponent } from '../radio-input/radio-input.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';
import { SelectInputComponent } from '../select-input/select-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        InputFormComponent, 
        PhonesRepeaterComponent,
        RadioInputComponent,
        CheckboxInputComponent,
        SelectInputComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
