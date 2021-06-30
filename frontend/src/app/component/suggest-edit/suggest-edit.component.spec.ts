import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestEditComponent } from './suggest-edit.component';

describe('SuggestEditComponent', () => {
  let component: SuggestEditComponent;
  let fixture: ComponentFixture<SuggestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
