import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRepeaterComponent } from './image-repeater.component';

describe('ImageRepeaterComponent', () => {
  let component: ImageRepeaterComponent;
  let fixture: ComponentFixture<ImageRepeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageRepeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRepeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
