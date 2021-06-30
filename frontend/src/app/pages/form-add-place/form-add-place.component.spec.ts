import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddPlaceComponent } from './form-add-place.component';
import { SelectInputComponent } from 'src/app/component/forms/select-input/select-input.component';
import { InputFormComponent } from 'src/app/component/forms/input-form/input-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormAddPlaceComponent', () => {
  let component: FormAddPlaceComponent;
  let fixture: ComponentFixture<FormAddPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddPlaceComponent, SelectInputComponent, InputFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
